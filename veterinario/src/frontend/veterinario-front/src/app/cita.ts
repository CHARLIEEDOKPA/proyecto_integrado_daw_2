import { Doctor } from "./doctor"
import { Mascota } from "./mascota"

export interface Cita {
    id: number
    date: number
    time: string
    id_mascota: number
    id_doctor: number
    mascota: Mascota
    doctor: Doctor
}
