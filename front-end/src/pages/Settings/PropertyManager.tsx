import { Panel, Table, TableHeader, TableRow, TableBody, TableCell, Button } from '@/components/ui';
import { cn } from '@/utils/utils';
import { Link, useParams } from 'react-router-dom';

const properties = [
  {
    id: '1',
    name: ' Checkbox',
    description: 'Allows users to select a True (checked) or False (unchecked) value.'
  },
  {
    id: '2',
    name: 'Date',
    description: 'Allows users to enter a date or pick a date from a popup calendar.'
  },
  {
    id: '3',
    name: 'Email',
    description: 'Allows users to enter an email address, which is validated to ensure proper format.'
  },
  {
    id: '4',
    name: 'Number',
    description: 'Allows users to enter any number. Leading zeros are removed.'
  },
  {
    id: '5',
    name: 'Phone',
    description: 'Allows users to enter any phone number. Automatically formats it as a phone number.'
  },
  {
    id: '6',
    name: 'Picklist',
    description: '	Allows users to select a value from a list you define.'
  },
  {
    id: '7',
    name: 'Text',
    description: 'Allows users to enter any combination of letters and numbers.'
  },
  {
    id: '8',
    name: 'Text Area',
    description: 'Allows users to enter up to 255 characters on separate lines.'
  }
];
const PropertyManager = () => {
  const { companyName = '' } = useParams();
  return (
    <Panel className={cn('m-0 flex h-full flex-col justify-start px-4 pb-4 pt-6')}>
      <Table>
        <TableHeader>
          <TableRow className='grid grid-cols-12'>
            <TableCell className='col-span-4 font-semibold md:col-span-3'>Data type</TableCell>
            <TableCell className='col-span-8 text-left font-semibold md:col-span-3'>Description</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => {
            return (
              <TableRow key={property.name} className='grid grid-cols-12'>
                <TableCell className='col-span-4 flex items-center gap-2 md:col-span-3'>
                  <input type='radio' name='propertyManager' id={'propertyManager' + property.name} />
                  <label htmlFor={'propertyManager' + property.name} className='font-md'>
                    {property.name}
                  </label>
                </TableCell>
                <TableCell className='col-span-8 line-clamp-3 text-sm md:col-span-6'>{property.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className='my-auto flex items-center gap-2 self-end px-2 py-4'>
        <Link to={`/${companyName}/setting/object-manager`}>
          <Button>Cancel</Button>
        </Link>
        <Link to={`#`}>
          <Button intent='primary'>Next</Button>
        </Link>
      </div>
    </Panel>
  );
};
export default PropertyManager;
