import express from "express";
import routes from "./routes/index.js";
import cors from 'cors';


const app = express();

const PORT = 3333;

app.use(cors());

app.use(express.json());

app.use(routes);



app.listen(PORT, () => {
  console.log("Server" + PORT);
});
