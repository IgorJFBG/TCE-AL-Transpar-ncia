import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, } from '@ant-design/icons';
import { removeAcento } from "./defaults";
import moment from 'moment';
import type { DataType, AditivoDataType } from "./defaults";

import dataRAW from '../data.json';
import { More } from './modal';
import { DateFilterDropdown, TextFilterDropdown } from './hooks';

const data = () => {
    let dataText = [] as DataType[];
    const dataJSON = JSON.parse(JSON.stringify(dataRAW));
    for (let i = 0; i < dataJSON.length; i++){
        if (dataJSON[i].documento.toLowerCase() !== "aditivo"){
            dataText.push(dataJSON[i]);
        }
        else{ 
            for (let j = 0; j < dataText.length; j++){
                if (dataJSON[i].contrato === dataText[j].contrato){
                    let aditivo;
                    if (dataText[j].aditivo == null){
                        aditivo = [] as AditivoDataType[];
                    }
                    else{
                        aditivo = JSON.parse(dataText[j].aditivo as string);
                    }
                    aditivo.push(dataJSON[i]);
                    dataText[j].aditivo = JSON.stringify(aditivo);
                }
            }
        }
    }
    return dataText as DataType[];
};

const columns: ColumnsType<DataType> = [
    { // contrato
        title: 'Contrato',
        dataIndex: 'contrato',
        key: 'contrato',
        filterDropdown: TextFilterDropdown,
        fixed: 'left',
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.contrato).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    { // aditivo
        title: 'Aditivo',
        dataIndex: 'aditivo',
        key: 'aditivo',
        render: (value: string) => {
            let contratos = JSON.parse(value);
            let aditivos = JSON.parse(value) as AditivoDataType[];
            return (
                <>
                    <More
                        aditivos={aditivos}
                        contrato={contratos[0].contrato}
                        contratado={contratos[0].contratado}
                        objeto={contratos[0].objeto}/>
                </>
            )
        },
        fixed: 'left',
    },
    { // contratado
        title: 'Contratado',
        dataIndex: 'contratado',
        key: 'contratado',
        filterDropdown: TextFilterDropdown,
        fixed: 'left',
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.contratado).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    { // objeto
        title: 'Objeto',
        dataIndex: 'objeto',
        key: 'objeto',
        filterDropdown: TextFilterDropdown,
        fixed: 'left',
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => record.objeto.toLowerCase().includes(String(value).toLowerCase())
    },
    { // valor
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor',
        sorter: (a: any, b: any) => a.valor - b.valor,
        render: (value) => {
            let valueSplitted;
            if (String(value).includes('.')){
                valueSplitted = String(value).split('.');
                if (valueSplitted[1].length === 1)
                    valueSplitted[1] += '0';
            }
            else{
                valueSplitted = [String(value), '00'];
            }

            let integerValue = "";
            let a = valueSplitted[0];
            for (let i = 1; i <= a.length; i++){
                integerValue = a[a.length-i] + integerValue;
                if (i % 3 === 0 && i !== a.length){
                    integerValue = '.' + integerValue;
                }
            }
            return 'R$ ' + integerValue + ',' + valueSplitted[1];
        },
    },
    { // assinatura
        title: 'Assinatura',
        dataIndex: 'data_da_assinatura',
        key: 'data_da_assinatura',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: DataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.data_da_assinatura)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.data_da_assinatura).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a, b) => moment(a.data_da_assinatura).unix() - moment(b.data_da_assinatura).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    { // publicação
        title: 'Publicação',
        dataIndex: 'data_da_publicacao',
        key: 'data_da_publicacao',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: DataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.data_da_publicacao)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.data_da_publicacao).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a,b) => moment(a.data_da_publicacao).unix() - moment(b.data_da_publicacao).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    { // início da vigência
        title: 'Início da Vigência',
        dataIndex: 'inicio_da_vigencia',
        key: 'inicio_da_vigencia',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: DataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.inicio_da_vigencia)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.inicio_da_vigencia).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a,b) => moment(a.inicio_da_vigencia).unix() - moment(b.inicio_da_vigencia).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    { // fim da vigência
        title: 'Fim da Vigência',
        dataIndex: 'fim_da_vigencia',
        key: 'fim_da_vigencia',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: DataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.fim_da_vigencia)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.fim_da_vigencia).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a,b) => moment(a.fim_da_vigencia).unix() - moment(b.fim_da_vigencia).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    { // fiscal
        title: 'Fiscal',
        dataIndex: 'fiscal',
        key: 'fiscal',
        filterDropdown: TextFilterDropdown,
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.fiscal).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    { // gestor
        title: 'Gestor',
        dataIndex: 'gestor',
        key: 'gestor',
        filterDropdown: TextFilterDropdown,
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.gestor).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    { // estágio
        title: 'Estágio',
        dataIndex: 'estagio',
        key: 'estagio',
    },
    { // documento
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
    },
    { // processo
        title: 'Processo',
        dataIndex: 'processo',
        key: 'processo',
    },
    { // modalidade
        title: 'Modalidade',
        dataIndex: 'modalidade',
        key: 'modalidade',
    },
];

export { data, columns };