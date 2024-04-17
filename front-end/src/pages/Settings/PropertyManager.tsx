import { Table, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui';

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
                      updateFields({ ...propertyList, property_id: property.id });
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
