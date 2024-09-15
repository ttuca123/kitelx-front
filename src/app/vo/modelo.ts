export interface Modelo {

    id:number;
    descricao: any;
    tamanhoInicio: number;
    tamanhoFim: number;
    anoInicio: number;
    anoFim: number;    
    idMarca?: number;
    descMarca?: string;
    categoria?: number;
}