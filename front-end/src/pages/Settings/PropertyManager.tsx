import { Panel, Table, TableHeader, TableRow, TableBody, TableCell, Button } from '@/components/ui';
import { cn } from '@/utils/utils';
import { Link, useParams } from 'react-router-dom';

const descriptions: string[] = [
  'Allows users to select a True (checked) or False (unchecked) value.',
  'Allows users to enter a date or pick a date from a popup calendar.',
  'Allows users to enter an email address, which is validated to ensure proper format.',
  'Allows users to enter any number. Leading zeros are removed.',
  'Allows users to enter any phone number. Automatically formats it as a phone number.',
  'Allows users to select a value from a list you define.',
  'Allows users to enter any combination of letters and numbers.',
  'Allows users to enter up to 255 characters on separate lines.'
];

const properties: Property[] = [
  {
    id: '1',
    name: 'Checkbox',
    type: 'Checkbox'
  },
  {
    id: '2',
    name: 'Date',
    type: 'Date'
  },
  {
    id: '3',
    name: 'Email',
    type: 'Email'
  },
  {
    id: '4',
    name: 'Number',
    type: 'Number'
  },
  {
    id: '5',
    name: 'Phone',
    type: 'Phone'
  },
  {
    id: '6',
    name: 'DropDown',
    type: 'DropDown'
  },
  {
    id: '7',
    name: 'Text',
    type: 'Text'
  },
  {
    id: '8',
    name: 'Text Area',
    type: 'TextArea'
  }
];

type PropertyData = {
  type_id: string;
  property_id: string;
};

type PropertyManagerProps = PropertyData & {
  propertyList: PropertyResponse[];
  updateFields: (fields: Partial<PropertyData>) => void;
};

const PropertyManager = ({ type_id, property_id: propertyId, propertyList, updateFields }: PropertyManagerProps) => {
  // const { companyName = '' } = useParams();
  return (
    <>
      <input value={type_id} name='type_id' className='hidden'></input>
      <Table>
        <TableHeader>
          <TableRow className='grid grid-cols-12'>
            <TableCell className='col-span-4 font-semibold md:col-span-3'>Data type</TableCell>
            <TableCell className='col-span-8 text-left font-semibold md:col-span-3'>Description</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propertyList.map((property, index) => {
            return (
              <TableRow key={property.name} className='grid grid-cols-12'>
                <TableCell className='col-span-4 flex items-center gap-2 md:col-span-3'>
                  <input
                    type='radio'
                    name='property_id'
                    id={'propertyManager' + property.name}
                    className='size-5'
                    onChange={(_) => {
                      updateFields({ property_id: property.id });
                    }}
                    checked={property.id === propertyId}
                  />
                  <label htmlFor={'propertyManager' + property.name} className='font-md'>
                    {property.name}
                  </label>
                </TableCell>
                <TableCell className='col-span-8 line-clamp-3 text-sm md:col-span-6'>{descriptions[index]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default PropertyManager;
