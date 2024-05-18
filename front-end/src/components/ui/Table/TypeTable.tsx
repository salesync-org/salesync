// import { Type } from '@/type';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';
import { ArrowRight, ArrowUpNarrowWide, Box, Waypoints } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../DropDownMenu';
import { cn } from '@/utils/utils';
import buttonVariants from '../Button/ButtonProps';
import LoadingSpinner from '../Loading/LoadingSpinner';

export const standardTypes = [
  'Account',
  'Campaign',
  'Call',
  'Case',
  'Contact',
  'Contract',
  'Deal',
  'Email',
  'Event',
  'Invoice',
  'Lead',
  'Opportunity',
  'Order',
  'Product',
  'PriceBook',
  'Quote',
  'Task'
];

const TypeTable = ({ types }: { types: Type[] }) => {
  const { companyName } = useParams();
  const navigate = useNavigate();
  return (
    <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
      {types ? (
        <Table className='h-full'>
          <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
            <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
              <TableCell className='max-w-28 font-semibold'>Type Name</TableCell>
              <TableCell className='font-semibold'>Template</TableCell>
              <TableCell className='font-semibold'>Description</TableCell>
              <TableCell className='max-w-9 font-semibold'></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className='h-full overflow-y-scroll'>
            {types.map((type, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className='w-4/12'>{type.name}</TableCell>
                  <TableCell className='w-3/12'>{type.template ? type.template.name : 'No Template'}</TableCell>
                  <TableCell className='w-3/12'>
                    {standardTypes.includes(type.name) ? 'Standard Object' : 'Custom Object'}
                  </TableCell>

                  <TableCell className='w-3/12'>
                    <div className=' flex justify-end pr-11 '>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            buttonVariants({ intent: 'normal', rounded: 'normal', zoom: true }),
                            'rounded-full border-2 border-button-stroke px-4 py-2 dark:border-button-stroke-dark'
                          )}
                        >
                          <div className='flex w-fit items-center justify-center space-x-2'>
                            <p>Manage</p>
                            <ArrowRight size={'1rem'} />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className={cn(
                            'hover:bg-dark w-56 bg-button-background-light dark:bg-button-background-dark',
                            'border-2 border-button-stroke-light/60 dark:border-button-stroke-dark/60'
                          )}
                        >
                          <DropdownMenuLabel>{`${type.name} Settings`}</DropdownMenuLabel>
                          <DropdownMenuSeparator className='border-[.2px] border-input-stroke-light px-2 dark:border-input-stroke-dark' />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => {
                                navigate(`/${companyName}/setting/object-manager/${type.id}?tab=properties`);
                              }}
                            >
                              <div className='flex items-center space-x-2'>
                                <Box size='1rem' />
                                <p>Properties</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                navigate(`/${companyName}/setting/object-manager/${type.id}?tab=relations`);
                              }}
                            >
                              <div className='flex items-center space-x-2'>
                                <Waypoints size='1rem' />
                                <p>Relations</p>
                              </div>
                            </DropdownMenuItem>
                            {type.template && type.template.name === 'StageObject' && (
                              <DropdownMenuItem
                                onClick={() => {
                                  navigate(`/${companyName}/setting/object-manager/${type.id}?tab=stages`);
                                }}
                              >
                                <div className='flex items-center space-x-2'>
                                  <ArrowUpNarrowWide size='1rem' />
                                  <p>Stages</p>
                                </div>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
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

export default TypeTable;
