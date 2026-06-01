import { useReducer, useCallback, useEffect } from 'react';
import { usePlantAnalysis } from './hooks/usePlantAnalysis';
import ApiKeyView   from './components/ApiKeyView';
import CaptureScreen from './components/CaptureScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import ErrorScreen   from './components/ErrorScreen';

function reducer(state, action) {
  switch (action.type) {
    case 'CAPTURE':
      return { ...state, screen: 'loading', imageFile: action.file, imagePreview: action.preview };
    case 'SUCCESS':
      return { ...state, screen: 'results', result: action.result };
    case 'ERROR':
      return { ...state, screen: 'error', error: action.error };
    case 'RESET':
      return { screen: 'capture', imageFile: null, imagePreview: null, result: null, error: null, isSettingsMode: false };
    case 'OPEN_SETTINGS':
      return { ...state, screen: 'apikey', isSettingsMode: true };
    case 'KEY_SET':
      return { ...state, screen: 'capture', isSettingsMode: false };
    case 'BACK_FROM_SETTINGS':
      return { ...state, screen: 'capture', isSettingsMode: false };
    default:
      return state;
  }
}

// Skip the key screen if the key is baked in at build time (production)
// or already saved in localStorage (local dev)
const hasKey = Boolean(import.meta.env.VITE_PLANTNET_API_KEY || localStorage.getItem('plantnet_api_key'));

const initial = {
  screen: hasKey ? 'capture' : 'apikey',
  imageFile: null, imagePreview: null, result: null, error: null, isSettingsMode: false,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const { analyze, loading, result, error } = usePlantAnalysis();

  const handleCapture = useCallback(async (file) => {
    const preview = URL.createObjectURL(file);
    dispatch({ type: 'CAPTURE', file, preview });
    await analyze(file);
  }, [analyze]);

  useEffect(() => {
    if (!loading && result && state.screen === 'loading') dispatch({ type: 'SUCCESS', result });
  }, [loading, result, state.screen]);

  useEffect(() => {
    if (!loading && error && state.screen === 'loading') dispatch({ type: 'ERROR', error });
  }, [loading, error, state.screen]);

  return (
    <main className="max-w-md mx-auto min-h-screen bg-cream-100 relative shadow-card-lg">
      {state.screen === 'apikey' && (
        <ApiKeyView
          isSettingsMode={state.isSettingsMode}
          onKeySet={() => dispatch({ type: 'KEY_SET' })}
          onBack={state.isSettingsMode ? () => dispatch({ type: 'BACK_FROM_SETTINGS' }) : undefined}
        />
      )}
      {state.screen === 'capture' && (
        <CaptureScreen
          onImageCapture={handleCapture}
          onOpenSettings={() => dispatch({ type: 'OPEN_SETTINGS' })}
        />
      )}
      {state.screen === 'loading' && (
        <LoadingScreen imagePreview={state.imagePreview} />
      )}
      {state.screen === 'results' && (
        <ResultsScreen
          result={state.result}
          imagePreview={state.imagePreview}
          onReset={() => dispatch({ type: 'RESET' })}
        />
      )}
      {state.screen === 'error' && (
        <ErrorScreen error={state.error} onRetry={() => dispatch({ type: 'RESET' })} />
      )}
    </main>
  );
}
