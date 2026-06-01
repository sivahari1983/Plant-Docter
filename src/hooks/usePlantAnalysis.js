import { useState } from 'react';
import { resizeImage } from '../utils/imageUtils';
import { lookupPlant } from '../data/plantNutrition';

const PLANTNET_ENDPOINT =
  'https://my-api.plantnet.org/v2/identify/all?include-related-images=false&lang=en';

export function usePlantAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);

  async function analyze(file) {
    const apiKey = localStorage.getItem('plantnet_api_key');
    if (!apiKey) {
      setError('No API key found. Please add your free Pl@ntNet API key in settings.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const [resized] = await Promise.all([
        resizeImage(file),
        new Promise(r => setTimeout(r, 1500)),
      ]);

      const body = new FormData();
      body.append('images', resized, resized.name || 'plant.jpg');
      body.append('organs', 'auto');

      const response = await fetch(`${PLANTNET_ENDPOINT}&api-key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        body,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid API key. Please check your Pl@ntNet key in settings.');
        }
        if (response.status === 404) {
          throw new Error('No plant could be identified. Try a clearer photo showing leaves, flowers, or fruit.');
        }
        throw new Error(err.message || `PlantNet API error (${response.status})`);
      }

      const data = await response.json();
      setResult(lookupPlant(data));
    } catch (e) {
      setError(e.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function reset() { setResult(null); setError(null); setLoading(false); }

  return { loading, result, error, analyze, reset };
}
