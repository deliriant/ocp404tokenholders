// Node.js example using Express
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors")
const app = express();

const etherscanApiKey = "I5BES1WK8UMBR75TKJKCK9NIFRXDC8A8TT";
const contractAddress = "0xB87b96868644d99Cc70a8565BA7311482eDEBF6e";

app.use(cors());

app.get("/api/numberOfHolders", async (req, res) => {
    try {
        const apiUrl = `https://api.etherscan.io/api?module=stats&action=tokentx&contractaddress=${contractAddress}&apikey=${etherscanApiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "1") {
            const numberOfHolders = data.result.length;
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
