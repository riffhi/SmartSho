// src/pages/SustainabilityScore.jsx
import React, { useState } from 'react';

function SustainabilityScore() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setResult('');

        try {
            const response = await fetch('http://localhost:5000/api/greenbits/sustainability-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            if (data.success) {
                setResult(data.result);
            } else {
                setResult('Something went wrong: ' + data.message);
            }
        } catch (error) {
            setResult('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>AI-Powered Sustainability Score</h2>
            <form onSubmit={handleSubmit}>
        <textarea
            rows="4"
            cols="50"
            placeholder="Enter material/process to evaluate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
        />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Get Score'}
                </button>
            </form>

            {result && (
                <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                    <h3>AI Response:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default SustainabilityScore;
