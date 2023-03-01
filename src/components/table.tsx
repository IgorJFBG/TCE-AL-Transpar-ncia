import { Button, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { Excel } from 'antd-table-saveas-excel';

import { data, columns } from './tableColumns';
import dataRAW from '../data.json';

export { OurTable };

const excelColumns = [
    { title: 'Contrato', dataIndex: 'contrato', key: 'contrato', },
    { title: 'Aditivo', dataIndex: 'aditivo', key: 'aditivo', },
    { title: 'Contratado', dataIndex: 'contratado', key: 'contratado', },
    { title: 'Objeto', dataIndex: 'objeto', key: 'objeto', },
    { title: 'Valor', dataIndex: 'valor', key: 'valor',
    render: (value: Number) => {
        let valueSplitted;
        if (String(value).includes('.')){
            valueSplitted = String(value).split('.');
            if (valueSplitted[1].length == 1)
                valueSplitted[1] += '0';
        }
        else{
            valueSplitted = [String(value), '00'];
        }

        let integerValue = "";
        let a = valueSplitted[0];
        for (let i = 1; i <= a.length; i++){
            integerValue = a[a.length-i] + integerValue;
            if (i % 3 == 0 && i != a.length){
                integerValue = '.' + integerValue;
            }
        }
        return 'R$ ' + integerValue + ',' + valueSplitted[1];},
    },
    { title: 'Data da Assinatura', dataIndex: 'data_da_assinatura', key: 'data_da_assinatura', render: (date: string) => moment(date).format('DD/MM/YYYY'),},
    { title: 'Data da Publicação', dataIndex: 'data_da_publicacao', key: 'data_da_publicacao', render: (date: string) => moment(date).format('DD/MM/YYYY'),},
    { title: 'Início da Vigência', dataIndex: 'inicio_da_vigencia', key: 'inicio_da_vigencia', render: (date: string) => moment(date).format('DD/MM/YYYY'),},
    { title: 'Fim da Vigência', dataIndex: 'fim_da_vigencia', key: 'fim_da_vigencia', render: (date: string) => moment(date).format('DD/MM/YYYY'),},
    { title: 'Fiscal', dataIndex: 'fiscal', key: 'fiscal', },
    { title: 'Gestor', dataIndex: 'gestor', key: 'gestor', },
    { title: 'Estágio', dataIndex: 'estágio', key: 'estágio', },
    { title: 'Documento', dataIndex: 'documento', key: 'documento', },
    { title: 'Processo', dataIndex: 'processo', key: 'processo', },
    { title: 'Modalidade', dataIndex: 'modalidade', key: 'modalidade', },
];

const DownloadExcel = () => {
    const excel = new Excel();
    excel
        .addSheet("Transparência")
        .addColumns(excelColumns)
        .addDataSource(dataRAW, {
            str2Percent: true
        })
        .saveAs("Transparência.xlsx");
};

function ConvertJSONtoXML(obj: any) {
    let xml = '';
    for (let prop in obj) {
      xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
      if (obj[prop] instanceof Array) {
        for (let array in obj[prop]) {
          xml += '\n<' + prop + '>\n';
          xml += ConvertJSONtoXML(new Object(obj[prop][array]));
          xml += '</' + prop + '>';
        }
      } else if (typeof obj[prop] == 'object') {
        xml += ConvertJSONtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : '</' + prop + '>\n';
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml;
  }

const DownloadXML = () => {
    const xml = ConvertJSONtoXML(dataRAW);
    console.log (xml);
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml));
    element.setAttribute('download', 'Transparência.xml');

    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();

    document.body.removeChild(element);
};

const DownloadJSON = () => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataRAW)));
    element.setAttribute('download', 'Transparência.json');

    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();

    document.body.removeChild(element);
}

function OurTable() {
    return (
        <>
            <div style={{
                paddingBlockEnd: 16,
                paddingInline: 8,
            }}>
                <Button type="primary" icon={<DownloadOutlined />} style={{marginInline: 8,}} onClick={DownloadExcel}>
                    Excel (xlsx)
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} style={{marginInline: 8,}} onClick={DownloadXML}>
                    Extensiva (xml)
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} style={{marginInline: 8,}} onClick={DownloadJSON}>
                    Objeto Web (json)
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data()}
                size='middle'
                scroll={{ x: 1600, }}
            />
        </>
    )
};