import express from "express";
import globalRouter from "./src/routers/globalRouter";
import twitterRouter from "./src/routers/twitterRouter";

const PORT = 3000;

const app = express();

const handleListening = () => {
    console.log(`🎄 server listening on port http://localhost:${PORT}`);
}

app.use("/",globalRouter);
app.use("/tweets",twitterRouter);


app.listen(PORT,handleListening);