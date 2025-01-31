require("dotenv").config(); // Charge les variables d'environnement
const express = require("express");
const axios = require("axios");

const cors = require("cors");
app.use(cors()); // Autorise toutes les origines (pour le développement)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Permet d'accepter du JSON dans les requêtes

// Route pour envoyer un message WhatsApp
app.post("/send-message", async (req, res) => {
    try {
        const { phone, message } = req.body;

        // Vérifie que le numéro et le message sont fournis
        if (!phone || !message) {
            return res.status(400).json({ error: "Numéro de téléphone et message requis" });
        }

        // URL de l'API Meta Cloud pour envoyer un message WhatsApp
        const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

        // Requête API
        const response = await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "text",
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error.response?.data || error.message);
        res.status(500).json({ error: "Impossible d'envoyer le message" });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
