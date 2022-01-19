/**
 * 
 * @author Artur Cavalcante
 * @since 01/05/2020
 * 
 * Ao utilizar o ambiente de TEST ou PROD,
 * favor descomentar a linha logo abaixo do ambiente escolhido e comentar a linha anterior.
 * Ex: TEST = '/api/teste' -> comenta //TEST = '/api/teste' descomenta TEST='https://kitelx.com.br:8280',
 * 
 */

export enum Ambiente {

    DEV= 'http://localhost:8480',    
    TEST= '/api-teste', //Usar somente no servidor
    //TEST='http://kitelx.com.br:8280',  //Usar no ambiente de DEV com liberação de IP
    //PROD= '/api-prod'//8380 //Usar somente no servidor
    PROD='http://kitelx.com.br:8380', //Usar no ambiente de DEV com liberação de IP   

}
