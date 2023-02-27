import { Button, Table } from 'antd';
import { colPadding } from './defaults';
import { DownloadOutlined } from '@ant-design/icons';

import { data, columns } from './tableColumns';
import type { DataType } from './defaults';

export { OurTable };

function OurTable() {
    return (
        <>
            <div style={{
                paddingBlock: 16,
                paddingInline: 8,
            }}>
                <Button type="primary" icon={<DownloadOutlined />} style={{marginInline: 8,}}>
                    Excel (xlsx)
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} style={{marginInline: 8,}}>
                    Extensiva (xml)
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} style={{marginInline: 8,}}>
                    Objeto Web (json)
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data()}
            />
        </>
    )
}