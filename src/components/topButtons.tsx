import { Col, Button } from 'antd';
import { colPadding } from './defaults';

export { TopButtons };

function TopButtons() {
    return (
        <>
            <Col span={6} style={colPadding}>
                <Button block>
                    Remuneração dos Servidores
                </Button>
            </Col>
            <Col span={6} style={colPadding}>
                <Button block>
                    Lotação
                </Button>
            </Col>
            <Col span={6} style={colPadding}>
                <Button block>
                    Tabela com Padrão Remuneratório
                </Button>
            </Col>
            <Col span={6} style={colPadding}>
                <Button block>
                    Legislação
                </Button>
            </Col>
        </>
    )
}