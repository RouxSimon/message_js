import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

const sendMessage = async () => {
    if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
        setResponse("Numéro de téléphone invalide.");
        return;
    }
    try {
        const res = await axios.post("http://10.0.2.2:3000/send-message", {
            phone,
            message,
        });
        setResponse("Message envoyé avec succès !");
    } catch (err) {
        setResponse("Erreur lors de l'envoi du message.");
    }
};


const App = () => {
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const res = await axios.post("http://10.0.2.2:3000/send-message", {
                phone,
                message,
            });
            setResponse("Message envoyé avec succès !");
        } catch (err) {
            setResponse("Erreur lors de l'envoi du message.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Numéro de téléphone"
                onChangeText={setPhone}
                value={phone}
            />
            <TextInput
                style={styles.input}
                placeholder="Message"
                onChangeText={setMessage}
                value={message}
            />
            <Button title="Envoyer" onPress={sendMessage} />
            <Text>{response}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, marginBottom: 10, padding: 10 },
});

app.use(cors({ origin: '*' }));

export default App;
