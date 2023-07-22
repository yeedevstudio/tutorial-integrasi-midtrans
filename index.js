const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Yeedev Shop API (midtrans)" });
});

require("./routes/transaksi.routes.js")(app);

app.use((req, res) => {
    return res.status(404).send('404 Not Found !');
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
