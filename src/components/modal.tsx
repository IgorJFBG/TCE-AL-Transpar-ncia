import { useState } from 'react';
import { Button, Modal, Typography, Space, Input, Table } from 'antd';
import moment from 'moment';
import { removeAcento } from './defaults';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { AditivoDataType } from './defaults';

const { Text } = Typography;

export { More };

const columns: ColumnsType<AditivoDataType> = [
    { // aditivo
        title: 'Aditivo',
        dataIndex: 'aditivo',
        key: 'aditivo',
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

function More(props: {
    aditivos: AditivoDataType[];
    contrato: string;
    contratado: string;
    objeto: string;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);

    return (
        <>
            <Button type="dashed" onClick={showModal}>
                <Text>{props.aditivos.length} aditivos</Text>
            </Button>
            <Modal
                title={props.objeto}
                centered
                open={isModalOpen}
                onOk={handleOk}
                width={1350}
                footer={[
                    <Button key="back" onClick={handleOk}>
                        Fechar
                    </Button>
                ]}>
                <Space direction='vertical'>
                    <Text>
                        Contrato: {props.contrato}
                    </Text>
                    <Text>
                        Contratado: {props.contratado}
                    </Text>
                </Space>
                <Table columns={columns} dataSource={props.aditivos} style={{ paddingBlockStart: 8 }}/>
            </Modal>
        </>
    )
}