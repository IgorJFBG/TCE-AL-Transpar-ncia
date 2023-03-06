import { useState } from 'react';
import { DatePicker, Button, Input } from 'antd';
import { SearchOutlined, } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs'; // importe o dayjs
import 'dayjs/locale/pt-br'; // importe o idioma desejado

const DateFilterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
  const [startValue, setStartValue] = useState<Dayjs | null>(null);
  const [endValue, setEndValue] = useState<Dayjs | null>(null);

  const handleStartChange = (value: Dayjs | null, dateString: string) => {
    setStartValue(value ? dayjs(dateString, 'DD/MM/YYYY') : null);
  };
  const handleEndChange = (value: Dayjs | null, dateString: string) => {
    setEndValue(value ? dayjs(dateString, 'DD/MM/YYYY') : null);
  };
  const handleSearch = () => {
    if (startValue && endValue){
      setSelectedKeys([`${startValue?.format('DD/MM/YYYY')},${endValue?.format('DD/MM/YYYY')}`]);
      confirm();
    }
  };
  const handleReset = () => {
    setStartValue(null);
    setEndValue(null);
    clearFilters();
  };

  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        format={'DD/MM/YYYY'}
        placeholder="Data inicial"
        onChange={(value, dateString) => handleStartChange(value, dateString)}
        value={startValue ? startValue : undefined} // Atribua "undefined" em vez de "null"
        style={{ marginRight: 8 }}
      />
      <DatePicker
        format={'DD/MM/YYYY'}
        placeholder="Data final"
        onChange={(value, dateString) => handleEndChange(value, dateString)}
        value={endValue ? endValue : undefined} // Atribua "undefined" em vez de "null"
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

const TextFilterDropdown = ({setSelectedKeys, selectedKeys, confirm}: any) => {
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
}

export { DateFilterDropdown, TextFilterDropdown }
