import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository{
    
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>){
        this.repository =  repository;
    }
    
    criaPet(pet: PetEntity): void {
        this.repository.save(pet);
    }

    async listaPet(): Promise<PetEntity[]> {
        return await this.repository.find();
    }

    async atualizaPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> {
        try{
            const petEncontrado = await this.repository.findOne({where: {id: id}});
            if (!petEncontrado) {
                return{ success: false, message: "Pet não encontrado" }
            }
            Object.assign(petEncontrado, pet);

            await this.repository.save(petEncontrado);

            return { success: true };
        } catch (error) {
            console.log(error);
            return{ success: false, message: "Erro ao atualizar o Pet" };
        };
    }

    async deletaPet(id: number): Promise<{success: boolean, message?: string}> {
        try{
            const petEncontrado = await this.repository.findOne({where: {id: id}});
            if (!petEncontrado) {
                return{ success: false, message: "Pet não encontrado" }
            }

            await this.repository.remove(petEncontrado);

            return { success: true };
        } catch (error) {
            console.log(error);
            return{ success: false, message: "Erro ao atualizar o Pet" };
        };
    }
    
};