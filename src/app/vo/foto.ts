
export interface Foto {

    id?: number;
    nome: string;
    refFoto?: string;
    spotId?: number;
    anuncioId?: number;
    equipamentoId?: number;
    referencia?:boolean;
    sincronizacaoS3?:boolean;
    size?: number;
    ordem: number;
}