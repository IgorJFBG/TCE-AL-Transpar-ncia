import { useState } from 'react';
import { Button, Modal, Typography, Row, Col } from 'antd';

const { Text } = Typography;

export { More };

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

function More(props: { value: string; }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const data = JSON.parse(props.value);

    const object = document.getElementById('object');
    if (object != null)
        object.innerHTML = data[0].objeto;

    const contract = document.getElementById('contract');
    if (contract != null)
        contract.innerHTML = data[0].contrato;

    const owner = document.getElementById('owner');
    if (owner != null)
        owner.innerHTML = data[0].contratado;

    const aditivos = document.getElementById('aditivos');
    if (aditivos != null){
        aditivos.innerHTML = JSON.parse(props.value).length + " aditivos";
    }

    return (
        <>
            <Button type="dashed" onClick={showModal}>
                <Text strong id="aditivos" />
            </Button>
            <Modal title="Aditivos do Objeto" open={isModalOpen} onOk={handleOk} cancelButtonProps={{ disabled: true }}>
                <Row>
                    <Col>
                        Objeto: <Text strong id="object" />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        Contato: <Text id="contract" />
                    </Col>
                    <Col span={16}>
                        Contratado: <Text id="owner" />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}