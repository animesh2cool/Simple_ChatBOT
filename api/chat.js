export default async function handler(req, res) {
  const { input, model } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourdomain.vercel.app',
        'X-Title': 'WSP ChatBot',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: input }],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from OpenRouter', details: err.message });
  }
}
