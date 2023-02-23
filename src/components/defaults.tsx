export {rowPadding, colPadding, removeAcento};

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