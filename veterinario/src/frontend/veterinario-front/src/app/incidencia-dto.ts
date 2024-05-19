import { Duenyo } from "./duenyo"

export interface IncidenciaDto {
    id: number
    leido: boolean
    id_doctor: number
    id_mascota: number
    observaciones: string
    fecha: number[]
    duenyo: Duenyo
}
