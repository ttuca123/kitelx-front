
export interface Usuario {

    id: any;
    authToken: any;
    hashSocial: string;
    nome: string;
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    fone: string;       
    cpf: string;
    senha: string;
    contraSenha: string;    
    fotoUrl: string;
    foto:any;
    tipo: any;   
    perfil: any;
    anuncios: any;
    equipamentos: any;
    totalEquipamentos: number;
    senhaHash: any;
    termosDeUso: boolean;
}