export default async function handler(req, res) {
    // CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    var TELEGRAM_BOT_TOKEN = "7866727707:AAEkLGOuSUGIGNjSmJmGLSCG7VU0mSi04IU";
    var TELEGRAM_CHAT_ID = "-5286954734";

    try {
        var body = req.body;
        var message = body.text || "Keine Nachricht";

        var response = await fetch(
            "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: "Markdown"
                })
            }
        );

        var data = await response.json();
        return res.status(200).json({ ok: true, result: data });
    } catch (error) {
        console.error("Telegram error:", error);
        return res.status(500).json({ ok: false, error: error.message });
    }
}
