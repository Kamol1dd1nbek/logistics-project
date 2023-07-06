const express = require('express');
const config = require('config');
const app = express();

// ====

const mainRouter = require("./routes/index.routes");

// ===

app.use(express.json());
app.use("/express", mainRouter);

// ===

async function start() {
    try {
        const PORT = config.get("port") || 3030;
        app.listen(PORT, ()=> {
            console.log(`Server is running on port: ${PORT}`);
        })
    } catch (error) {
        console.log("Serverda xatolik!")
    }
}
start();