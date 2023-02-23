import React from 'react';
import { Row, Col, Divider, Input, DatePicker, Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { colPadding } from './defaults';

export { TableSearch };

const { Text } = Typography;

function TableSearch() {
    return (
        <>
            <Row>
                <Col span={6}>
                    <Divider orientation='left'>
                        Objeto
                    </Divider>
                </Col>
                <Col span={6}>
                    <Divider orientation='left'>
                        Data Início
                    </Divider>
                </Col>
                <Col span={6}>
                    <Divider orientation='left'>
                        Data Fim
                    </Divider>
                </Col>
            </Row>
            <Row style={{
                paddingBlockEnd: 16,
                paddingInline: 8
                }}>
                <Col span={6} style={colPadding}>
                    <Input placeholder="Pesquisar na tabela" />
                </Col>
                <Col span={6} style={colPadding}>
                    <DatePicker placeholder="Selecionar data" style={{width: '100%'}}/>
                </Col>
                <Col span={6} style={colPadding}>
                    <DatePicker placeholder="Selecionar data" style={{width: '100%'}}/>
                </Col>
                <Col span={6} style={colPadding}>
                    <Button type="primary" icon={<SearchOutlined />} block>
                        <Text strong style={{color: 'white'}}>Pesquisar</Text>
                    </Button>
                </Col>
            </Row>
        </>
    )
}