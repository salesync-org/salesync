// import { Type } from '@/type';
import { Button, ButtonProps } from '../Button';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';
import { Pencil, Trash2 } from 'lucide-react';

type TypeRelationProps = {
  propertyDetailList: TypePropertyDetail[] | null;
  onPropertyDelete: (id: string) => void;
};

const TypeRelationTable = ({ propertyDetailList, onPropertyDelete }: TypeRelationProps) => {
  return (
    <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
      <Table className='h-full'>
        <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
          <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
            <TableCell className='max-w-28 font-semibold'>Source Type</TableCell>
            <TableCell className='font-semibold'>Source Label</TableCell>
            <TableCell className='font-semibold'>Relation</TableCell>
            <TableCell className='font-semibold'>Destination Label</TableCell>
            <TableCell className='font-semibold'>Destination Type</TableCell>
            <TableCell className=''></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className='h-full overflow-y-scroll'>
          {propertyDetailList &&
            propertyDetailList.map((property, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className='w-4/12'>{property.name}</TableCell>
                  <TableCell className='w-4/12'>{property.label}</TableCell>
                  <TableCell className='w-4/12'>{property.property.name}</TableCell>
                  <TableCell className='w-4/12'>{property.name}</TableCell>
                  <TableCell className='w-4/12'>{property.label}</TableCell>
                  <TableCell className='w-4/12'>{property.property.name}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TypeRelationTable;
