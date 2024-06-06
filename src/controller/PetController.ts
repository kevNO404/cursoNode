import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaPets: PetEntity[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController{

    constructor(private repository: PetRepository){}

    criaPet(req: Request, res: Response){
        const {nome, especie, adotado, dataNasc} = <PetEntity>req.body;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie Inválida" });
        }
        
        const novoPet = new PetEntity(geraId(), nome, especie, adotado, dataNasc);
        this.repository.criaPet(novoPet);
        res.status(201).json(novoPet);
    }

    async listaPet(_req: Request, res: Response){
        const listaPets = await this.repository.listaPet();
        return res.status(200).json(listaPets);
    }

    async atualizaPet(req: Request, res: Response){
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);
        
        if (!success) {
            return res.status(404).json({message});
        }
        return res.sendStatus(204).json({message});
    }
    
    async deletaPet(req: Request, res: Response){
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(Number(id));

        if (!success) {
            return res.status(404).json({message});
        }
        return res.status(204).json({message});
    }
}