/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@/components/ui';
import { PropertyElement } from '@/type';
import { Link } from 'react-router-dom';

export const createColumns = (companyName: string, properties: PropertyElement[]) => {
  const columns: any = [
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }: { row: any }) => <span className='select-none text-xs'>{row.index + 1}</span>
    }
  ];

  properties.forEach((property) => {
    if (property.name === 'Name') {
      columns.push({
        accessorKey: 'Name',
        header: ({ column }: { column: any }) => (
          <div
            className='flex items-center justify-between'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span className='text-sm font-medium'>Name</span>
            <Icon name='expand_more' />
          </div>
        ),
        cell: ({ row }: { row: any }) => {
          return (
            <Link
              to={`/${companyName}/record/${row.getValue('id')}`}
              className='block w-full items-center align-middle text-sm font-semibold text-blue-500 hover:underline'
            >
              {row.getValue('Name')}
            </Link>
          );
        }
      });
      return;
    }
    columns.push({
      accessorKey: property.name,
      header: ({ column }: { column: any }) => (
        <div
          className='flex items-center justify-between'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span className='text-sm font-medium'>{property.label}</span>
          <Icon name='expand_more' />
        </div>
      ),
      cell: ({ row }: { row: any }) => {
        return <span className='text-sm'>{row.getValue(property.name)}</span>;
      }
    });
  });

  return columns;
};
