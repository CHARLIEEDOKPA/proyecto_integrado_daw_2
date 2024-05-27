import { Comentario } from "./comentario";
import { Duenyo } from "./duenyo";

export interface ComentarioDto extends Comentario{

    duenyo: Duenyo;
}
