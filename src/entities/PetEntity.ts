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
}