import { Type } from '@/type';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Button';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';
import { ChevronRight } from 'lucide-react';

const TypeTable = ({ types }: { types: Type[] }) => {
  const { companyName } = useParams();
  const navigate = useNavigate();
  return (
    <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
      <Table className='h-full'>
        <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
          <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
            <TableCell className='max-w-28 font-semibold'>Type Name</TableCell>
            <TableCell className='font-semibold'>Template</TableCell>
            <TableCell className='max-w-9 font-semibold'></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className='h-full overflow-y-scroll'>
          {types?.map((type, index) => {
            return (
              <TableRow key={index}>
                <TableCell className='max-w-28'>
                  <Button
                    intent='link'
                    className='border-none text-secondary-dark underline underline-offset-2 dark:text-secondary'
                    onClick={() => {
                      navigate(`/${companyName}/setting/object-manager/${type.id}`);
                    }}
                  >
                    {type.name}
                  </Button>
                </TableCell>
                <TableCell>{typeof type.template == 'string' ? type.template : 'No Template'}</TableCell>

                <TableCell className='max-w-9'>
                  <Button
                    intent={'normal'}
                    rounded={'icon'}
                    onClick={() => {
                      navigate(`/${companyName}/setting/object-manager/${type.id}`);
                    }}
                    className='p-0 hover:border-2 hover:border-input-stroke-light dark:hover:border-input-stroke-dark'
                  >
                    <ChevronRight name='navigate_next' size={'1.5rem'} />
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

export default TypeTable;
