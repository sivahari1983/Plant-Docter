import { useState } from 'react';
import { resizeImage } from '../utils/imageUtils';
import { lookupPlant } from '../data/plantNutrition';

// Module-level cache so the model is loaded only once per session
let modelCache = null;

async function loadModel() {
  if (modelCache) return modelCache;
  // Dynamic imports keep TF.js out of the initial bundle
  await import('@tensorflow/tfjs');
  const mobilenet = await import('@tensorflow-models/mobilenet');
  modelCache = await mobilenet.load();
  return modelCache;
}

function fileToImageElement(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image.')); };
    img.src = url;
  });
}

export function usePlantAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);

  async function analyze(file) {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const [resized, model] = await Promise.all([
        resizeImage(file),
        loadModel(),
        // Ensure the loading screen is visible for at least 2 s
        new Promise(r => setTimeout(r, 2000)),
      ]);

      const img         = await fileToImageElement(resized);
      const predictions = await model.classify(img, 5); // top 5 guesses
      const plantData   = lookupPlant(predictions);
      setResult(plantData);
    } catch (e) {
      setError(e.message || 'Analysis failed. Please try with a clearer photo.');
    } finally {
      setLoading(false);
    }
  }

  function reset() { setResult(null); setError(null); setLoading(false); }

  return { loading, result, error, analyze, reset };
}
