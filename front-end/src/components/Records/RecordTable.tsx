import { Sale, columns } from './columns';
import { DataTable } from './data-table';

const RecordTable = () => {
  let data: Sale[] = [
    {
      id: '1',
      index: -1,
      name: 'John Doe',
      title: 'CEO',
      company: 'ACME',
      phone: '555-555-5555',
      email: '',
      leadStatus: 'New',
      ownerAlias: 'JD'
    },
    {
      id: '2',
      index: -1,
      name: 'Jane Doe',
      title: 'CFO',
      company: 'ACME',
      phone: '555-555-5555',
      email: '',
      leadStatus: 'New',
      ownerAlias: 'JD'
    }
  ];

  data = data.map((d, i) => ({ ...d, index: i + 1 }));

  return <DataTable columns={columns} data={data} />;
};
export default RecordTable;
