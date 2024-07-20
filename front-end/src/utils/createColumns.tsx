/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi from '@/api/record';
import { Button, Checkbox, Icon, TextInput, Tooltip } from '@/components/ui';
import { ActionDropDown } from '@/components/ui/DropDown';
import { useToast } from '@/components/ui/Toast';
import { Check, Pencil, X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { cn, formatCurrency } from './utils';

export const createColumns = (companyName: string, properties: any[], records: any[]) => {
  const { domainName } = useParams();
  const columns: any = [
    {
      accessorKey: 'id',
      header: '',
      cell: () => <span className='select-none text-xs'></span>
    },
    {
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label='Select all'
        />
      ),
      cell: ({ row }: any) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        );
      },
      enableSorting: false,
      enableHiding: false
    }
  ];

  properties.forEach((property) => {
    if (!property.name) {
      return;
    }

    if (property.label.includes('NotShowing')) {
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
          let href = `/${companyName}/section/${domainName}/record/${row.getValue('id')}`;
          if (property.label === 'ReportName') {
            href = `/${companyName}/section/${domainName}/report/${row.getValue('id')}`;
          }
          return (
            <Link
              to={href}
              className='block min-w-[200px] items-center align-middle text-sm font-semibold text-blue-500 hover:underline'
            >
              {row.getValue('Name')}
            </Link>
          );
        }
      });
      return;
    }
    columns.push({
      accessorKey: `${property.name}`,
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
        return <CellRender row={row} cell={cell} property={property} records={records} />;
      }
    });
  });

  columns.push({
    accessorKey: 'actions',
    header: '',
    cell: ({ row }: { row: any }) => {
      return <ActionCell row={row} />;
    }
  });

  return columns;
};

const CellRender = ({ row, cell, property, records }: { row: any; cell: any; property: any; records: any }) => {
  const queryClient = useQueryClient();
  const { companyName = '' } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(row.getValue(property.name));
  const { toast } = useToast();
  let cellValue = row.getValue(property.name);
  const [currentValue, setCurrentValue] = useState(cellValue);
  if (property.name === 'Amount') {
    cellValue = formatCurrency(+cellValue) || '0';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const findRecord = records.find((record: { id: any }) => record.id === row.getValue('id'));

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

  const inputType = {
    Date: 'date',
    Number: 'number',
    Text: 'text'
  };

  return (
    <div>
      {isUpdating ? (
        <form onSubmit={handleUpdate} className='relative w-full min-w-[250px]'>
          <div className='absolute right-0 z-10 flex h-full space-x-1'>
            {isLoading === false && (
              <Button
                className='aspect-square h-10 w-10 select-none rounded-full p-0'
                rounded
                onClick={() => {
                  setIsUpdating(false);
                  setValue(row.getValue(property.name));
                }}
                intent='normal'
                disabled={isLoading}
              >
                <X size='16px' />
              </Button>
            )}
            <Button
              className='aspect-square h-10 w-10 select-none rounded-full p-0'
              type='submit'
              rounded
              disabled={value === row.getValue(property.name) || isLoading}
              onClick={handleUpdate}
              intent='primary'
            >
              {isLoading ? 'Updating...' : <Check size='16px' />}
            </Button>
          </div>
          <TextInput
            type={inputType[property.property.name as keyof typeof inputType] || 'text'}
            className='w-full select-none'
            value={value}
            onChange={handleChange}
            inputClassName='pr-[156px]'
          ></TextInput>
        </form>
      ) : (
        <div className='group/item flex h-full min-w-[200px] items-center justify-between'>
          <span className='text-sm'>{currentValue}</span>
          <Pencil
            data-tooltip-id='editingCell'
            data-tooltip-content='Edit Property'
            size='16px'
            className={cn(
              'cursor-pointer opacity-0 transition-all duration-300 hover:text-primary-color group-hover/item:opacity-100'
            )}
            onClick={() => setIsUpdating(!isUpdating)}
          />
          <Tooltip id='editingCell' />
        </div>
      )}
    </div>
  );
};

const ActionCell = ({ row }: { row: any }) => {
  const { companyName = '' } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteRecord = async (recordId: string, recordName: string) => {
    if (window.confirm(`Are you sure you want to delete the record: ${recordName}?`)) {
      try {
        await recordApi.deleteRecord(companyName, [recordId]);
        toast({
          title: 'Success',
          description: 'Record deleted successfully'
        });
        queryClient.invalidateQueries('records');
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to delete record',
          variant: 'destructive'
        });
      }
    }
  };
  return (
    <div className='flex items-center justify-center space-x-2 overflow-visible'>
      <ActionDropDown
        actions={[{ title: 'Delete', action: () => deleteRecord(row.getValue('id'), row.getValue('Name')) }]}
      />
    </div>
  );
};
