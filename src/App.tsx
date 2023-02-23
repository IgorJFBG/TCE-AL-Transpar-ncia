import React, {useState} from 'react';
import logo from './logo.svg';

import { Col, Row, Button, DatePicker, Divider, Input, Typography, Table, Modal } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import dataRAW from './data.json';

import { rowPadding } from './components/defaults';

import { TopButtons } from './components/topButtons';
import { TableSearch } from './components/tableSearch';
import { OurTable } from './components/table';

const App: React.FC = () => {
    return (
        <>
        <Row style={rowPadding}>
            <TopButtons />
        </Row>
        <div style={{backgroundColor: 'lightblue'}}>
            <TableSearch />
        </div>
        <OurTable />
    </>
    )
};

export default App;