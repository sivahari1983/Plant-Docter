import { useState } from 'react';
import { resizeImage, fileToBase64 } from '../utils/imageUtils';
import { lookupPlant } from '../data/plantNutrition';

const PLANTNET_URL    = 'https://my-api.plantnet.org/v2/identify/all?include-related-images=false&lang=en';
const OPENROUTER_URL  = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'google/gemini-flash-1.5-8b:free';

function buildHealthPrompt(plantName) {
  return `You are an expert botanist, plant pathologist, and horticulturist.

The plant in this image has been identified as: ${plantName}

Examine every visible detail — leaf colour, texture, edges, veins, stems, and any spots, patches, or deformations. Be thorough.

Respond with ONLY a valid JSON object. No markdown fences, no explanation outside the JSON.

{
  "overallCondition": "healthy | mild_stress | stressed | severe",
  "conditionSummary": "One sentence describing the plant's current state",
  "symptoms": [
    "Precise description of symptom 1 (colour, location, pattern)",
    "Precise description of symptom 2"
  ],
  "rootCauses": [
    {
      "cause": "Root cause name (e.g. Iron deficiency, Overwatering, Spider mites)",
      "likelihood": "high | medium | low",
      "explanation": "Why this matches the visible symptoms"
    }
  ],
  "supplements": [
    {
      "name": "Exact product or nutrient name",
      "type": "foliar spray | soil drench | granular fertilizer | soil amendment | biological control | pruning",
      "dosage": "Specific amount and dilution (e.g. 5 ml per litre of water)",
      "frequency": "How often (e.g. every 7 days for 3 weeks)",
      "priority": "urgent | recommended | optional",
      "purpose": "What deficiency or problem this directly addresses"
    }
  ],
  "immediateActions": "The 1–2 things to do today to stop further decline",
  "recoveryTimeline": "Realistic timeframe to see improvement (e.g. 2–3 weeks)",
  "preventionTips": "How to prevent this problem recurring"
}

If the plant appears healthy, still list 2–3 optimal maintenance supplements and set overallCondition to "healthy".
Provide at least 3 root causes and 3 supplements regardless of condition.`;
}

async function callOpenRouter(imageFile, plantName) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || localStorage.getItem('openrouter_api_key');
  if (!apiKey) return null;

  const base64   = await fileToBase64(imageFile);
  const mimeType = imageFile.type || 'image/jpeg';

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization':  `Bearer ${apiKey}`,
      'HTTP-Referer':   'https://sivahari1983.github.io/Plant-Docter/',
      'X-Title':        'Plant Doctor',
      'Content-Type':   'application/json',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
          { type: 'text', text: buildHealthPrompt(plantName) },
        ],
      }],
      max_tokens: 1500,
    }),
  });

  if (!res.ok) return null;

  const data  = await res.json();
  const text  = data.choices?.[0]?.message?.content?.trim() || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  return JSON.parse(match[0]);
}

export function usePlantAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);

  async function analyze(file, organ = 'leaf') {
    const plantNetKey = import.meta.env.VITE_PLANTNET_API_KEY || localStorage.getItem('plantnet_api_key');
    if (!plantNetKey) {
      setError('No API key found. Please add your Pl@ntNet API key in settings.');
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

      // ── Step 1: PlantNet species identification ───────────────────────────
      const formBody = new FormData();
      formBody.append('images', resized, resized.name || 'plant.jpg');
      formBody.append('organs', organ);

      const pnRes = await fetch(`${PLANTNET_URL}&api-key=${encodeURIComponent(plantNetKey)}`, {
        method: 'POST',
        body:   formBody,
      });

      if (!pnRes.ok) {
        const err = await pnRes.json().catch(() => ({}));
        if (pnRes.status === 401 || pnRes.status === 403)
          throw new Error('Invalid Pl@ntNet API key. Please update it in settings.');
        if (pnRes.status === 404)
          throw new Error('No plant detected. Try a clearer photo of a leaf, flower, or stem.');
        throw new Error(err.message || `PlantNet error (${pnRes.status})`);
      }

      const pnData      = await pnRes.json();
      const speciesData = lookupPlant(pnData);

      // ── Step 2: OpenRouter visual health & root-cause analysis ──────────────
      let healthAnalysis = null;
      try {
        healthAnalysis = await callOpenRouter(resized, speciesData.plantName);
      } catch (openRouterErr) {
        // Non-fatal: species info still shows even if OpenRouter fails
        console.warn('OpenRouter health analysis unavailable:', openRouterErr.message);
      }

      setResult({ ...speciesData, healthAnalysis });
    } catch (e) {
      setError(e.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function reset() { setResult(null); setError(null); setLoading(false); }
  return { loading, result, error, analyze, reset };
}
