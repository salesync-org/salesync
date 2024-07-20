// import { Type } from '@/type';
import NotFoundImage from '@/components/NotFoundImage/NotFoundImage';
import { Button } from '../Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { Table, TableHeader, TableRow, TableBody, TableCell } from './Table';
import { Pencil, Trash2 } from 'lucide-react';
import { Modal } from '../Modal';
import PropertyFieldConfig from '@/pages/Settings/PropertyFieldConfig';
import { useState } from 'react';
import LoadingSpinnerSmall from '../Loading/LoadingSpinnerSmall';

type TypePropertyTableProps = {
  propertyDetailList: TypePropertyDetail[] | null;
  onPropertyDelete: (id: string) => Promise<void>;
  onPropertyEdit: (property: UpdateTypePropertyRequest | null) => Promise<void>;
};

type UpdateTypePropertyRequest = {
  id: string;
  name: string;
  label: string;
  sequence: number;
  default_value: string;
  fields: UdateTypePropertyField[];
};

type UdateTypePropertyField = {
  item_value: string;
  property_field_id: string;
};

const TypePropertyTable = ({ propertyDetailList, onPropertyDelete, onPropertyEdit }: TypePropertyTableProps) => {
  const [isEditing, setIsEditing] = useState<TypePropertyDetail | null>(null);
  const [updatingForm, setUpdatingForm] = useState<UpdateTypePropertyRequest | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<string>('');

  const handleUpdateProperty = async () => {
    setIsUploading(true);
    await onPropertyEdit(updatingForm).then(() => {
      setIsEditing(null);
      setUpdatingForm(null);
      setIsUploading(false);
    });
  };
  return (
    <>
      <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
        {propertyDetailList ? (
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
              {propertyDetailList.length > 0 ? (
                propertyDetailList.map((property, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className='w-4/12'>{property.name}</TableCell>
                      <TableCell className='w-4/12'>{property.label}</TableCell>
                      <TableCell className='w-4/12'>{property.property.name}</TableCell>
                      <TableCell className='flex w-full max-w-28 justify-end space-x-4'>
                        <Button
                          rounded
                          className='aspect-square rounded-full p-0'
                          onClick={() => {
                            setIsEditing(property);
                            setUpdatingForm({
                              id: property.id,
                              name: property.name,
                              label: property.label,
                              sequence: property.sequence,
                              default_value: property.default_value,
                              fields: [
                                {
                                  item_value: '',
                                  property_field_id: ''
                                }
                              ]
                            });
                          }}
                        >
                          <Pencil size={'1rem'}></Pencil>
                        </Button>
                        <Button
                          rounded
                          className='aspect-square rounded-full p-0'
                          onClick={async (_) => {
                            setIsDeleting(property.id);
                            await onPropertyDelete(property.id);
                          }}
                        >
                          {isDeleting === property.id ? (
                            <LoadingSpinnerSmall className='h-[1.2rem] w-[1.2rem]'></LoadingSpinnerSmall>
                          ) : (
                            <Trash2 size={'1rem'}></Trash2>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className='w-full text-center' colSpan={4}>
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
      {isEditing != null && (
        <Modal
          title='Configurate Property'
          onClose={() => {
            setIsEditing(null);
            setUpdatingForm(null);
          }}
          isOpen={isEditing !== null}
        >
          <PropertyFieldConfig
            name={isEditing.name}
            label={isEditing.label}
            sequence={isEditing.sequence}
            default_value={isEditing.default_value}
            fields={isEditing.fields.map((field) => {
              const typeProperty: PropertyField = field.property_field;
              typeProperty.default_value = field.item_value;
              return typeProperty;
            })}
            updateFields={async (
              fields: Partial<{
                name: string;
                label: string;
                sequence: number;
                default_value: string;
                fields?: PropertyField[] | undefined;
              }>
            ) => {
              setUpdatingForm((prev) => {
                if (prev === null) {
                  return null;
                }
                const result: UpdateTypePropertyRequest = {
                  id: prev.id,
                  name: fields.fields?.find((field) => field.label === 'Name')?.item_value || '',
                  label: fields.fields?.find((field) => field.label === 'Label')?.item_value || '',
                  sequence: prev.sequence,
                  default_value: prev.default_value,
                  fields:
                    fields.fields?.map((field) => {
                      return {
                        item_value: field.item_value || '',
                        property_field_id: field.id || ''
                      };
                    }) || []
                };
                return result;
              });
            }}
          />
          <div className='flex w-full justify-end space-x-2 p-4 align-middle'>
            <Button
              onClick={() => {
                setIsEditing(null);
              }}
            >
              Cancel
            </Button>
            <Button
              intent={'primary'}
              onClick={() => {
                handleUpdateProperty();
              }}
            >
              {isUploading && (
                <LoadingSpinnerSmall className='h-[1.2rem] w-[1.2rem] fill-on-primary'></LoadingSpinnerSmall>
              )}
              <p>Modify</p>
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TypePropertyTable;
