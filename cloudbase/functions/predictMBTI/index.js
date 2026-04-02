'use strict';

const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();

exports.main = async (event = {}) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return {
            ok: false,
            error: 'Missing GEMINI_API_KEY in CloudBase function environment variables.'
        };
    }

    const prompt = typeof event.prompt === 'string' ? event.prompt.trim() : '';
    if (!prompt) {
        return {
            ok: false,
            error: 'Missing prompt.'
        };
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const details = await response.text();
        return {
            ok: false,
            error: `Gemini request failed with ${response.status}`,
            details
        };
    }

    const data = await response.json();
    const mbtiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const mbtiMatch = mbtiText.match(/\b([EI][NS][FT][PJ])\b/);

    const record = {
        selectedClub: event.selectedClub || null,
        answers: Array.isArray(event.answers) ? event.answers : [],
        lang: event.lang || 'en',
        mbti: mbtiMatch ? mbtiMatch[1] : null,
        mbtiText,
        createdAt: new Date()
    };

    let saveResult = null;
    try {
        saveResult = await db.collection(process.env.RESULT_COLLECTION || 'game_results').add(record);
    } catch (error) {
        saveResult = {
            error: error.message
        };
    }

    return {
        ok: true,
        mbtiText,
        predictedMBTI: mbtiMatch ? mbtiMatch[1] : null,
        saveResult
    };
};
