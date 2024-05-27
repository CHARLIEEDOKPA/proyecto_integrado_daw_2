import { Comentario } from "./comentario"
import { MeGusta } from "./me-gusta"

export interface Publicacion {
    id: number
    photo_url: string
    descripcion: string
    megustas: MeGusta[]
    comentarios: Comentario[]
    
}
