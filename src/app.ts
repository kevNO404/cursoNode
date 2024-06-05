import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata"
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

app.get("/", (_, res: Response) => {
  res.send("Bem vindo ao curso de TypeScript!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de Dados Conectado");
  }).catch((erro) => {
    console.log(erro);
  });

export default app;
