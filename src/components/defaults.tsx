const rowPadding = {
    paddingBlock: 16,
    paddingInline: 8,
};

const colPadding = {
    paddingInline: 8,
    paddingBlock: 0,
}

const removeAcento = (texto: String) => {
    texto = texto.replace(/[ÀÁÂÃÄÅ]/,"A");
    texto = texto.replace(/[àáâãäå]/,"a");
    texto = texto.replace(/[ÈÉÊË]/,"E");
    texto = texto.replace(/[Ç]/,"C");
    texto = texto.replace(/[ç]/,"c");
    return texto.replace(/[^a-z0-9]/gi,''); 
}

interface DataType{
    contrato: string,
    aditivo: string,
    contratado: string,
    objeto: string,
    valor: string,
    data_da_assinatura: string,
    data_da_publicacao: string,
    inicio_da_vigencia: string,
    fim_da_vigencia: string,
    fiscal: string,
    gestor: string,
    estagio: string,
    documento: string,
    processo: string,
    modalidade: string | null,
}

interface AditivoDataType{
    aditivo: string,
    valor: string,
    data_da_assinatura: string,
    data_da_publicacao: string,
    inicio_da_vigencia: string,
    fim_da_vigencia: string,
    fiscal: string,
    gestor: string,
    estagio: string,
    documento: string,
    processo: string,
    modalidade: string | null
}

export {rowPadding, colPadding, removeAcento};
export type { DataType, AditivoDataType };