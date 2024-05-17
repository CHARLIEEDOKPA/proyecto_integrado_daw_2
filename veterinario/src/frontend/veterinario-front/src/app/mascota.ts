import { Incidencia } from "./incidencia"

export interface Mascota {

    id: number
    nombre: string
    nacimiento: number
    sexo: string
    citas: any[]
    foto: any
    raza:string
    incidencias:Incidencia[]
}
