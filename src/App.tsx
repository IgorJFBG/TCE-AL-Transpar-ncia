import React, {useState} from 'react';
import logo from './logo.svg';

import { Row } from 'antd';

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
        <OurTable />
    </>
    )
};

export default App;