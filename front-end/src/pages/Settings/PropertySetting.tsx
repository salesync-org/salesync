import { Button, Panel } from '@/components/ui';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import PropertyManager from './PropertyManager';
import { useMultistepForm } from '@/hooks/useMutistepForm';
import PropertyFieldConfig from './PropertyFieldConfig';
import useType from '@/hooks/type-service/useType';
import useProperty from '@/hooks/type-service/useProperty';

type PropertySettingSubmitForm = {
  type_id: string;
  property_id: string;
  name: string;
  label: string;
  sequence: number;
  default_value: string;
  fields?: PropertyField[];
};

const PropertySetting = () => {
  const { companyName, typeId } = useParams();
  const { properties } = useProperty(companyName ?? '');
  const [data, setData] = useState<PropertySettingSubmitForm>({
    type_id: typeId ?? '',
    property_id: '',
    name: '',
    label: '',
    sequence: 1,
    default_value: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  function updateFields(updatedFields: Partial<PropertySettingSubmitForm>) {
    setData((prev) => {
      return { ...prev, ...updatedFields };
    });
  }
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <PropertyManager propertyList={properties ?? []} {...data} updateFields={updateFields} />,
    <PropertyFieldConfig {...data} updateFields={updateFields} />
  ]);

  return (
    <>
      <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
        <div className='my-4 flex overflow-y-auto px-4 py-4'>
          <div className='flex-grow '>
            {/* <h2 className='mb-5 w-3/4 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
              General Information
            </h2> */}
            {step}
          </div>
        </div>
        <div className='my-auto flex w-full items-center justify-end gap-2 px-2 py-4'>
          <Button
            onClick={() => {
              if (isFirstStep) {
                navigate(`/${companyName}/setting/object-manager`);
              } else {
                back();
              }
            }}
          >
            {isFirstStep ? 'Cancel' : 'Back'}
          </Button>
          <Button
            intent='primary'
            disabled={!data.property_id}
            onClick={() => {
              if (currentStepIndex === 0) {
                setData({
                  ...data,
                  fields: [...(properties?.find((property) => property.id === data.property_id)?.propertyFields ?? [])]
                });
                // if (data.property_id === '1') {
                //   setData({
                //     ...data,
                //     fields: [
                //       { id: '1', label: 'Name', name: 'name', value: '' },
                //       { id: '2', label: 'Checkbox', name: 'checkboxvalue', value: '' }
                //     ]
                //   });
                // } else {
                //   setData({
                //     ...data,
                //     fields: [
                //       { id: '1', label: 'Name', name: 'name', value: '' },
                //       { id: '2', label: 'DropDownValue', name: 'dropdownvalue', value: '' }
                //     ]
                //   });
                // }
                next();
              }
            }}
          >
            {isLastStep ? 'Add Type' : 'Next'}
          </Button>
        </div>
      </Panel>
    </>
  );
};

export default PropertySetting;
