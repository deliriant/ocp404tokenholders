// Node.js example using Express
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

const ethplorerApiKey = "freekey";  // Use your actual Ethplorer API key
const contractAddress = "0xb87b96868644d99cc70a8565ba7311482edebf6e";

app.use(cors());

app.get("/api/numberOfHolders", async (req, res) => {
    try {
        const apiUrl = `https://api.ethplorer.io/getTokenInfo/${contractAddress}?apiKey=${ethplorerApiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.holdersCount !== undefined) {
            const numberOfHolders = data.holdersCount;
            res.json({ numberOfHolders });
        } else {
            res.status(500).json({ error: "Error fetching token holders" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
