import { Doctor } from "./doctor";
import { Recomendacion } from "./recomendacion";

export interface RecomendacionDoctor {

    id:number
    recomendacion: Recomendacion
    doctor:Doctor
}
