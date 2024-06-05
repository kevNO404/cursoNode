import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";

let listaPets: TipoPet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController{

    constructor(private repository: PetRepository){}

    criaPet(req: Request, res: Response){
        const {nome, especie, adotado, dataNasc} = <TipoPet>req.body;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie Inválida" });
        }
        
        const novoPet: TipoPet = {id: geraId(), nome, especie, adotado, dataNasc};
        this.repository.criaPet(novoPet);
        res.status(201).json(novoPet);
    }

    listaPet(_req: Request, res: Response){
        res.status(200).json(listaPets);
    }

    atualizaPet(req: Request, res: Response){
        const { id } = req.params;
        const { nome, especie , adotado , dataNasc } = req.body as TipoPet;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie Inválida" });
        }

        const pet = listaPets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({erro: "Pet não encontrado"});
        }
        pet.nome = nome;
        pet.especie = especie;
        pet.adotado = adotado;
        pet.dataNasc = dataNasc;
        return res.status(200).json(pet);
    }
    
    deletaPet(req: Request, res: Response){
        const { id } = req.params;
        const pet = listaPets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({erro: "Pet não encontrado"});
        }
        const index = listaPets.indexOf(pet);
        listaPets.splice(index, 1);
        return res.status(200).json({mensagem: "Pet deletado com sucesso"});
    }
}