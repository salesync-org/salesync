/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi from '@/api/record';
import { Button, Icon, TextInput } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { Pencil } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { cn } from './utils';

export const createColumns = (companyName: string, properties: any[], records: any[]) => {
  const columns: any = [
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }: { row: any }) => <span className='select-none text-xs'>{row.index + 1}</span>
    }
  ];

  properties.forEach((property) => {
    if (!property.name) {
      return;
    }

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
      cell: ({ row, cell }: { row: any; cell: any }) => {
        const [currentValue, setCurrentValue] = useState(row.getValue(property.name));
        const [isUpdating, setIsUpdating] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [value, setValue] = useState(row.getValue(property.name));
        const { toast } = useToast();
        const queryClient = useQueryClient();

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        };

        const handleUpdate = async () => {
          try {
            setIsLoading(true);
            const findRecord = records.find((record) => record.id === row.getValue('id'));

            if (!findRecord) throw new Error('Record not found');

            const recordProperties = findRecord.properties;
            // const newProperties = recordProperties.map((recordProperty: TypeProperty) => {
            //   if (recordProperty.id === property.id) {
            //     return { ...recordProperty, item_value: value };
            //   }
            //   return recordProperty;
            // });
            const findIndex = recordProperties.findIndex(
              (recordProperty: { property_name: any }) => recordProperty.property_name === cell.column.id
            );

            findRecord.properties[findIndex].item_value = value;

            const res = await recordApi.updateRecord(companyName, findRecord.id, findRecord);

            if (res) {
              setIsUpdating(false);
              toast({
                title: 'Success',
                description: 'Record updated successfully'
              });

              setCurrentValue(value);
              queryClient.invalidateQueries('record', findRecord.id);
            }
          } catch (error: any) {
            console.error(error);
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive'
            });
          } finally {
            setIsLoading(false);
          }
        };
        return (
          <div>
            {isUpdating ? (
              <form onSubmit={handleUpdate} className='relative w-full'>
                <div className='absolute right-0 z-10 flex h-full'>
                  <Button
                    className='h-full select-none'
                    onClick={() => {
                      setIsUpdating(false);
                      setValue(row.getValue(property.name));
                    }}
                    intent='normal'
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className='h-full select-none'
                    type='submit'
                    disabled={value === row.getValue(property.name) || isLoading}
                    onClick={handleUpdate}
                    intent='primary'
                  >
                    {isLoading ? 'Updating...' : 'Save'}
                  </Button>
                </div>
                <TextInput
                  className='w-full select-none'
                  value={value}
                  onChange={handleChange}
                  inputClassName='pr-[156px]'
                ></TextInput>
              </form>
            ) : (
              <div className='group/item flex h-full items-center justify-between'>
                <span className='text-sm'>{currentValue}</span>
                <Pencil
                  size='16px'
                  className={cn(
                    'cursor-pointer opacity-0 transition-all duration-300 hover:text-primary-color group-hover/item:opacity-100'
                  )}
                  onClick={() => setIsUpdating(!isUpdating)}
                />
              </div>
            )}
          </div>
        );
      }
    });
  });

  return columns;
};
