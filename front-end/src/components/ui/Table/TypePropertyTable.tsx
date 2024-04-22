// import { Type } from '@/type';
import { Button, ButtonProps } from '../Button';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';
import { Pencil, Trash2 } from 'lucide-react';

type TypePropertyTableProps = {
  propertyDetailList: TypePropertyDetail[] | null;
  onPropertyDelete: (id: string) => void;
};

const TypePropertyTable = ({ propertyDetailList, onPropertyDelete }: TypePropertyTableProps) => {
  return (
    <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
      <Table className='h-full'>
        <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
          <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
            <TableCell className='max-w-28 font-semibold'>Property Name</TableCell>
            <TableCell className='font-semibold'>Property Label</TableCell>
            <TableCell className='font-semibold'>Property Type</TableCell>
            <TableCell className=''></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className='h-full overflow-y-hidden'>
          {propertyDetailList &&
            propertyDetailList.map((property, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className='w-4/12'>{property.name}</TableCell>
                  <TableCell className='w-4/12'>{property.label}</TableCell>
                  <TableCell className='w-4/12'>{property.property.name}</TableCell>
                  <TableCell className='flex w-full max-w-28 justify-end space-x-4'>
                    <Button rounded className='aspect-square rounded-full p-0'>
                      <Pencil size={'1rem'}></Pencil>
                    </Button>
                    <Button
                      rounded
                      className='aspect-square rounded-full p-0'
                      onClick={(_) => {
                        onPropertyDelete(property.id);
                      }}
                    >
                      <Trash2 size={'1rem'}></Trash2>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TypePropertyTable;
