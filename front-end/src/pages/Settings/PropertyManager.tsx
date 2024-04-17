import { Table, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui';

const descriptions: { [key: string]: string } = {
  Text: 'Allows users to enter any combination of letters and numbers.',
  TextArea: 'Allows users to enter up to 255 characters on separate lines.',
  Number: 'Allows users to enter any positive number. Leading zeros are removed.',
  Checkbox: 'Allows users to select a True (checked) or False (unchecked) value.',
  URL: 'Allows users to enter an  URL.',
  Email: 'Allows users to enter an email address, which is validated to ensure proper format.',
  Phone: 'Allows users to enter any phone number. Automatically formats it as a phone number.',
  Geolocation: 'Allows users to enter a location.',
  Image: 'Allows users to upload an image.',
  Date: 'Allows users to enter a date or pick a date from a popup calendar.',
  DateTime: 'Allows users to enter a date or pick a date and time from a popup calendar.',
  PickList: 'Allows users to select a value from a list you define.'
};

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
      <input value={type_id} name='type_id' readOnly className='hidden'></input>
      <Table>
        <TableHeader>
          <TableRow className='grid grid-cols-12'>
            <TableCell className='col-span-4 font-semibold md:col-span-3'>Data type</TableCell>
            <TableCell className='col-span-8 text-left font-semibold md:col-span-3'>Description</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propertyList.map((property) => {
            return (
              <TableRow key={property.name} className='grid grid-cols-12'>
                <TableCell className='col-span-4 flex items-center gap-2 md:col-span-3'>
                  <input
                    type='radio'
                    name='property_id'
                    id={'propertyManager' + property.name}
                    className='size-5'
                    onChange={(_) => {
                      updateFields({ ...propertyList, property_id: property.id });
                    }}
                    checked={property.id === propertyId}
                  />
                  <label htmlFor={'propertyManager' + property.name} className='font-md w-full'>
                    {property.name}
                  </label>
                </TableCell>
                <TableCell className='col-span-8 line-clamp-3 text-sm md:col-span-6'>
                  {descriptions[property.name]}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default PropertyManager;
