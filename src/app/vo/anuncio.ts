import { TemplateEquipamento } from './template-equipamento';

export interface Anuncio extends TemplateEquipamento {

    dataPublicacao: any;
    dataExclusao?: any;
    valor: any;
    acessorio:any;    
    ativo:any;
    nomeAnunciante:any;
    zapAnunciante:any;
    emailAnunciante:any;
    localidade: string;
    logo: string;
    estado?: any;
    cidade?: any;
    outroAcessorio: string;   
    sincronizacaoS3: boolean;
    valorMinimo?: any;
    valorMaximo?: any;
    motivoExclusao?: any;
    motivoExclusaoDesc?:string;
    lugarVenda?: string;
    destaque?: boolean;
    nota?:number;
    dataExclusaoInicio?: Date;
    dataExclusaoFim?: Date;


}
