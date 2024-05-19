import { Doctor } from "./doctor"

export interface RecomendacionDto {

    id: number
    sobre: string
    fecha: number[]
    texto: string
    id_mascota: number
    id_doctor: number
    leido: boolean
    doctor: Doctor
}
