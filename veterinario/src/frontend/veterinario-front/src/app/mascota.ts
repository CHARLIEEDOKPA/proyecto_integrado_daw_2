import { Incidencia } from "./incidencia"

export interface Mascota {

    id: number
    nombre: string
    nacimiento: number
    sexo: string
    citas: any[] | null
    foto: string
    raza:string
    incidencias:Incidencia[] | null
}
