/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@/components/ui';
import { PropertyElement } from '@/type';
import { Link } from 'react-router-dom';

export const createColumns = (companyName: string, properties: PropertyElement[]) => {
  const columns: any = [
    {
      accessorKey: 'id',
      header: '',
      cell: () => <span></span>
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
            <span className=''>Name</span>
            <Icon name='expand_more' />
          </div>
        ),
        cell: ({ row }: { row: any }) => {
          return (
            <Link
              to={`/record/${row.getValue('id')}`}
              className='block w-full items-center align-middle text-blue-500 hover:underline'
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
          <span className=''>{property.label}</span>
          <Icon name='expand_more' />
        </div>
      ),
      cell: ({ row }: { row: any }) => {
        return <span>{row.getValue(property.name)}</span>;
      }
    });
  });

  return columns;
};
