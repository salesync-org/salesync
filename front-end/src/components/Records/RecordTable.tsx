import { Sale, columns } from './columns';
import { DataTable } from './data-table';

const RecordTable = () => {
  const data: Sale[] = [
    {
      id: '1',
      person: {
        id: '1',
        name: 'John Doe'
      },
      title: 'CEO',
      company: 'ACME',
      phone: '555-555-5555',
      email: '',
      leadStatus: 'New',
      ownerAlias: 'JD'
    },
    {
      id: '2',
      person: {
        id: '2',
        name: 'John Doe'
      },
      title: 'CFO',
      company: 'ACME',
      phone: '555-555-5555',
      email: '',
      leadStatus: 'New',
      ownerAlias: 'JD'
    }
  ];

  return <DataTable columns={columns} data={data} />;
};
export default RecordTable;
