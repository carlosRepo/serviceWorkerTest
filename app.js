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

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    console.log(req.body)
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "mensaje de back");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})