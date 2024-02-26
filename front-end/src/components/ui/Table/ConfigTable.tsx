import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/Table/Table';

interface ConfigTableProps {
  data: Link[];
}

const LinkConfigTable = ({ data }: ConfigTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Link Type</TableHead>
          <TableHead>To Type</TableHead>
          <TableHead>Label Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.link_type}</TableCell>
            <TableCell>{item.to_type}</TableCell>
            <TableCell>{item.label_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LinkConfigTable;
