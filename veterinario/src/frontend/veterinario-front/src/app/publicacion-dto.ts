import { ComentarioDto } from "./comentario-dto";
import { Duenyo } from "./duenyo";
import { Publicacion } from "./publicacion";

export interface PublicacionDto extends Publicacion{

    comentarioDTOs: ComentarioDto[]
    duenyo:Duenyo
}
