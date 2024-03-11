import { Sale, columns } from './columns';
import { DataTable } from './data-table';

const RecordTable = () => {
  const data: Sale[] = [
    {
      id: '1',
      person: {
        id: '1',
        name: 'John Doe 1'
      },
      title: 'CEO1',
      company: 'ACME1',
      phone: '555-555-5554',
      email: '',
      leadStatus: 'New1',
      ownerAlias: 'JD1'
    },
    {
      id: '2',
      person: {
        id: '2',
        name: 'John Doe 2'
      },
      title: 'CFO1',
      company: 'ACME',
      phone: '555-555-5555',
      email: '',
      leadStatus: 'New2',
      ownerAlias: 'JD2'
    }
  ];

  return <DataTable columns={columns} data={data} />;
};
export default RecordTable;
