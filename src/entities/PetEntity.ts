import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";

@Entity()
export default class PetEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    especie: EnumEspecie;
    @Column()
    adotado: boolean;
    @Column()
    dataNasc: Date;

    constructor(id:number, nome:string, especie:EnumEspecie, adotado:boolean, dataNasc:Date){
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.adotado = adotado;
        this.dataNasc = dataNasc;
    }
}