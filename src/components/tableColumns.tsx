import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { removeAcento } from "./defaults";
import moment from 'moment';
import type { DataType, AditivoDataType } from "./defaults";

import dataRAW from '../data.json';
import { More } from './modal';

export { data, columns };

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
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Digite sua busca aqui"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value?[e.target.value]:[])
                            if (e.target.value.length >= 1)
                                confirm({closeDropdown: false});
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        style={{ marginInline: 4, marginBlockStart: 4, width: 200 }}></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ margin: 4, width: 120}}>
                            Pesquisar
                    </Button>
                </>
            )
        },
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
        }
    },
    {
        title: 'Contratado',
        dataIndex: 'contratado',
        key: 'contratado',
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Digite sua busca aqui"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value?[e.target.value]:[])
                            if (e.target.value.length >= 1)
                                confirm({closeDropdown: false});
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        style={{ marginInline: 4, marginBlockStart: 4, width: 200 }}></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ margin: 4, width: 120}}>
                            Pesquisar
                    </Button>
                </>
            )
        },
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.contratado).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    {
        title: 'Objeto',
        dataIndex: 'objeto',
        key: 'objeto',
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Digite sua busca aqui"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value?[e.target.value]:[])
                            if (e.target.value.length >= 1)
                                confirm({closeDropdown: false});
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        style={{ marginInline: 4, marginBlockStart: 4, width: 200 }}></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ margin: 4, width: 120}}>
                            Pesquisar
                    </Button>
                </>
            )
        },
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => record.objeto.toLowerCase().includes(String(value).toLowerCase())
    },
    {
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor',
        render: (value) => {
            let valueSplitted;
            if (String(value).includes('.')){
                valueSplitted = String(value).split('.');
                if (valueSplitted[1].length == 1)
                    valueSplitted[1] += '0';
            }
            else{
                valueSplitted = [String(value), '00'];
            }

            let integerValue = "";
            let a = valueSplitted[0];
            for (let i = 1; i <= a.length; i++){
                integerValue = a[a.length-i] + integerValue;
                if (i % 3 == 0 && i != a.length){
                    integerValue = '.' + integerValue;
                }
            }
            return 'R$ ' + integerValue + ',' + valueSplitted[1];
        },
    },
    {
        title: 'Data da Assinatura',
        dataIndex: 'data_da_assinatura',
        key: 'data_da_assinatura',
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Data da Publicação',
        dataIndex: 'data_da_publicacao',
        key: 'data_da_publicacao',
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Início da Vigência',
        dataIndex: 'inicio_da_vigencia',
        key: 'inicio_da_vigencia',
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Fim da Vigência',
        dataIndex: 'fim_da_vigencia',
        key: 'fim_da_vigencia',
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Fiscal',
        dataIndex: 'fiscal',
        key: 'fiscal',
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Digite sua busca aqui"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value?[e.target.value]:[])
                            if (e.target.value.length >= 1)
                                confirm({closeDropdown: false});
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        style={{ marginInline: 4, marginBlockStart: 4, width: 200 }}></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ margin: 4, width: 120}}>
                            Pesquisar
                    </Button>
                </>
            )
        },
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.fiscal).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    {
        title: 'Gestor',
        dataIndex: 'gestor',
        key: 'gestor',
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Digite sua busca aqui"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value?[e.target.value]:[])
                            if (e.target.value.length >= 1)
                                confirm({closeDropdown: false});
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        style={{ marginInline: 4, marginBlockStart: 4, width: 200 }}></Input>
                    <Button
                        onClick={() => {
                            confirm();
                        }}
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ margin: 4, width: 120}}>
                            Pesquisar
                    </Button>
                </>
            )
        },
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.gestor).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    {
        title: 'Estágio',
        dataIndex: 'estagio',
        key: 'estagio',
    },
    {
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
    },
    {
        title: 'Processo',
        dataIndex: 'processo',
        key: 'processo',
    },
    {
        title: 'Modalidade',
        dataIndex: 'modalidade',
        key: 'modalidade',
    },
];