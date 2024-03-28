const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BEBFFsXHqgfoAwWbrUWlArMwPoFytZkZPoxIiJEoxDcGk7DvhEokMtwSiJiUY3p-TuQIyJW-jdcov1L1UMrCizk",
    privateKey: "PkflFKJRpDX9u3MAidaa-oOyY0t-aKEpdZmmWk_L3hM"
}

webpush.setVapidDetails(
    'mailto:YOUR_MAILTO_STRING',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
    const subscription = req.body;
    subDatabase.push(subscription);
    res.json({ status: "Success", message: "Subscription saved!" });
});
app.get("/send-notification", (req, res) => {
    if (subDatabase.length > 0) {
        const message = "Mensaje de tu servidor";
        Promise.all(subDatabase.map(subscription =>
            webpush.sendNotification(subscription, JSON.stringify({ title: "Notificación", body: message }))
        ))
            .then(() => res.json({ status: "Success", message: "Message sent to push service" }))
            .catch(err => {
                console.error("Error sending notification:", err);
                res.status(500).json({ status: "Error", message: "Failed to send notification" });
            });
    } else {
        res.status(400).json({ status: "Error", message: "No subscriptions found" });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});