import { useState } from 'react';
import { Button, Modal, Typography } from 'antd';

const { Text } = Typography;

export { More };

function More(props: { value: string; }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);

    const aditivos = document.getElementById('aditivos');
    if (aditivos != null){
        aditivos.innerHTML = JSON.parse(props.value).length + " aditivos";
    }

    return (
        <>
            <Button type="dashed" onClick={showModal}>
                <Text strong id="aditivos" />
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} cancelButtonProps={{ disabled: true }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}