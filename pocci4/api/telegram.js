export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    var BOT_TOKEN = "7866727707:AAEkLGOuSUGIGNjSmJmGLSCG7VU0mSi04IU";
    var CHAT_ID = "-5286954734";

    try {
        // Akzeptiert sowohl "message" als auch "text"
        var message = req.body.message || req.body.text || "Keine Nachricht";

        var response = await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "HTML"
            })
        });

        var data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
