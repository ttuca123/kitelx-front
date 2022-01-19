import { Foto } from "./foto";
export interface TemplateEquipamento {

    id: number;
    tipo : any;
    ano: number;
    tamanho: string;    
    marca: any;
    modelo: any;    
    observacao: string;
    idUsuario: number;
    outroModelo: '';
    outraMarca: '';
    fotos?: Foto[];    
    barra: boolean;    
}
