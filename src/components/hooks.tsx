import { useState } from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import moment, { Moment } from 'moment';
import { start } from 'repl';

const FilterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
    const [startValue, setStartValue] = useState<Moment | null>(null);
    const [endValue, setEndValue] = useState<Moment | null>(null);

    const handleStartChange = (value: Moment | null, dateString: string) => {
      setStartValue(value ? moment(dateString, 'DD/MM/YYYY') : null);
    };
    const handleEndChange = (value: Moment | null, dateString: string) => {
      setEndValue(value ? moment(dateString, 'DD/MM/YYYY') : null);
    };
    const handleSearch = () => {
        if (startValue && endValue){
            setSelectedKeys([`${startValue?.format('DD/MM/YYYY')},${endValue?.format('DD/MM/YYYY')}`]);
            confirm();
            setStartValue(startValue);
            setEndValue(endValue);
        }
    };
    const handleReset = () => {
        setStartValue(null);
        setEndValue(null);
    };
    return (
      <div style={{ padding: 8 }}>
        <DatePicker
            format={'DD/MM/YYYY'}
            placeholder="Data inicial"
            onChange={(value, dateString) => handleStartChange(moment(value?.toDate()), dateString)}
            style={{ marginRight: 8 }}
        />
        <DatePicker
            format={'DD/MM/YYYY'}
            placeholder="Data final"
            onChange={(value, dateString) => handleEndChange(moment(value?.toDate()), dateString)}
            style={{ marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
          Buscar
        </Button>
        <Button onClick={handleReset} style={{ marginRight: 8 }}>
          Limpar
        </Button>
      </div>
    );
}

export { FilterDropdown }