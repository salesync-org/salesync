import Icon from '../Icon/Icon';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';

const TypeTable = ({ type }: { type: Type }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {type.fields?.map((field) => {
            return (
              <TableCell key={field.id} className='font-medium'>
                {field.label}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {type.fields?.[0].values?.map((_, index) => {
          return (
            <TableRow key={index}>
              {type.fields?.map((field) => {
                return <TableCell key={field.id}>{field.values?.[index]}</TableCell>;
              })}

              <TableCell>
                <button>
                  <Icon name='navigate_next' />
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TypeTable;
