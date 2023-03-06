import { useState } from 'react';
import { Button, Modal, Typography, Space, Table } from 'antd';
import moment from 'moment';
import { removeAcento } from './defaults';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import type { AditivoDataType } from './defaults';
import { DateFilterDropdown, TextFilterDropdown } from './hooks';

const { Text } = Typography;

const columns: ColumnsType<AditivoDataType> = [
    { // aditivo
        title: 'Aditivo',
        dataIndex: 'aditivo',
        key: 'aditivo',
        fixed: 'left',
    },
    {
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
    {
        title: 'Data da Assinatura',
        dataIndex: 'data_da_assinatura',
        key: 'data_da_assinatura',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: AditivoDataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.data_da_assinatura)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.data_da_assinatura).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a, b) => moment(a.data_da_assinatura).unix() - moment(b.data_da_assinatura).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Data da Publicação',
        dataIndex: 'data_da_publicacao',
        key: 'data_da_publicacao',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: AditivoDataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.data_da_publicacao)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.data_da_assinatura).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a,b) => moment(a.data_da_publicacao).unix() - moment(b.data_da_publicacao).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Início da Vigência',
        dataIndex: 'inicio_da_vigencia',
        key: 'inicio_da_vigencia',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: AditivoDataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.inicio_da_vigencia)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.data_da_assinatura).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a,b) => moment(a.inicio_da_vigencia).unix() - moment(b.inicio_da_vigencia).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Fim da Vigência',
        dataIndex: 'fim_da_vigencia',
        key: 'fim_da_vigencia',
        filterDropdown: DateFilterDropdown,
        onFilter: (value, record: AditivoDataType) => {
            const [start, end] = (value as String).split(',');
            console.log(`Moment: (${moment(record.fim_da_vigencia)}) \n\n - Value: ${value} \n - Start: ${start} / ${moment(start, 'DD/MM/YYYY')} \n - End: ${end} / ${moment(end, 'DD/MM/YYYY')} \n\nResultado: ${moment(record.data_da_assinatura).isBetween(moment(start), moment(end), 'day', '[]')}`)
            return moment(record.data_da_assinatura).isBetween(moment(start, 'DD/MM/YYYY'), moment(end, 'DD/MM/YYYY'), 'day', '[]');
        },
        sorter: (a,b) => moment(a.fim_da_vigencia).unix() - moment(b.fim_da_vigencia).unix(),
        render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
        title: 'Fiscal',
        dataIndex: 'fiscal',
        key: 'fiscal',
        filterDropdown: TextFilterDropdown,
        filterIcon: () => <SearchOutlined />,
        onFilter: (value, record) => removeAcento(record.fiscal).toLowerCase().includes(removeAcento(String(value)).toLowerCase())
    },
    {
        title: 'Gestor',
        dataIndex: 'gestor',
        key: 'gestor',
        filterDropdown: TextFilterDropdown,
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
                width={1400}
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
                <Table
                    columns={columns}
                    dataSource={props.aditivos}
                    style={{ paddingBlockStart: 8 }}
                    size="small"
                    pagination={{ pageSize: 50}}
                    scroll={{ y: 300, x: 1300 }}
                    />
            </Modal>
        </>
    )
}

export { More };