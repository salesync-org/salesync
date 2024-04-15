import { Button, Panel, TextInput } from '@/components/ui';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import PropertyManager from './PropertyManager';
import { useMultistepForm } from '@/hooks/useMutistepForm';
import PropertyFieldConfig from './PropertyFieldConfig';

type PropertySettingSubmitForm = {
  typeId: string;
  propertyId: string;
  propertyFields: PropertyField[];
};

const PropertySetting = () => {
  const { companyName } = useParams();
  const [data, setData] = useState<PropertySettingSubmitForm>({
    typeId: '',
    propertyId: '',
    propertyFields: [
      { id: '1', label: 'Name', name: 'name', value: '' },
      { id: '2', label: 'DropDownValue', name: 'dropdownvalue', value: '' }
    ]
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  function updateFields(fields: Partial<PropertySettingSubmitForm>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <PropertyManager {...data} updateFields={updateFields} />,
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
            onClick={() => {
              if (currentStepIndex === 0) {
                if (data.propertyId === '1') {
                  setData({
                    ...data,
                    propertyFields: [
                      { id: '1', label: 'Name', name: 'name', value: '' },
                      { id: '2', label: 'Checkbox', name: 'checkboxvalue', value: '' }
                    ]
                  });
                } else {
                  setData({
                    ...data,
                    propertyFields: [
                      { id: '1', label: 'Name', name: 'name', value: '' },
                      { id: '2', label: 'DropDownValue', name: 'dropdownvalue', value: '' }
                    ]
                  });
                }
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
