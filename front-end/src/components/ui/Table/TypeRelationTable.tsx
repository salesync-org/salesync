// import { Type } from '@/type';
import NotFoundImage from '@/components/NotFoundImage/NotFoundImage';
import { Button } from '../Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';
import { Pencil } from 'lucide-react';

type TypeRelationProps = {
  relationList: TypeRelation[] | null;
};

const TypeRelationTable = ({ relationList }: TypeRelationProps) => {
  return (
    <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
      {relationList ? (
        <Table className='h-full'>
          <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
            <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
              <TableCell className='max-w-28 font-semibold'>Source Type</TableCell>
              <TableCell className='font-semibold'>Source Label</TableCell>
              <TableCell className='font-semibold'>Relation</TableCell>
              <TableCell className='font-semibold'>Destination Label</TableCell>
              <TableCell className='font-semibold'>Destination Type</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className='h-full overflow-y-scroll'>
            {relationList.length > 0 ? (
              relationList.map((relation, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='w-1/5'>{relation.source_type.name ?? ''}</TableCell>
                    <TableCell className='w-1/5'>{relation.source_type_label ?? ''}</TableCell>
                    <TableCell className='w-1/5'>{relation.relation ? relation.relation.name : ''}</TableCell>
                    <TableCell className='w-1/5'>{relation.destination_type_label ?? ''}</TableCell>
                    <TableCell className='w-1/5'>{relation.destination_type.name ?? ''}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className=''>
                  <NotFoundImage />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default TypeRelationTable;
