import { Button, Panel } from '@/components/ui';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import PropertyManager from './PropertyManager';
import { useMultistepForm } from '@/hooks/useMutistepForm';
import PropertyFieldConfig from './PropertyFieldConfig';
import useProperty from '@/hooks/type-service/useProperty';
import typeApi from '@/api/type';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      return {
        ...prev,
        name: updatedFields?.fields?.find((f) => f.label === 'Name')?.item_value ?? '',
        label: updatedFields?.fields?.find((f) => f.label === 'Label')?.item_value ?? '',
        ...updatedFields
      };
    });
  }

  const groupFields = (): Record<string, PropertyField> => {
    return data!.fields!.reduce((acc: Record<string, PropertyField>, field) => {
      const label = field.label;
      if (label) {
        if (!acc[label]) {
          acc[label] = field;
        } else {
          if (field.default_value === 'true') {
            acc[label] = field;
          }
        }
      }
      return acc;
    }, {});
  };

  function checkStepFinished(currentStepIndex: number) {
    if (currentStepIndex === 0) {
      return data.property_id !== '';
    }
    if (currentStepIndex === 1) {
      const groupedPropertyFields = groupFields();
      if (data.fields) {
        for (const field of data.fields.filter((field) => field.is_required)) {
          const propertyField = groupedPropertyFields[field.label];
          if (!propertyField && field.is_required) {
            return false;
          }
          if (
            (propertyField.field?.input_type === 'Text' || propertyField.field?.input_type === 'TextArea') &&
            (!propertyField.item_value || propertyField.item_value === '')
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }
  const { step, isFirstStep, currentStepIndex, isLastStep, back, next } = useMultistepForm([
    <PropertyManager propertyList={properties ?? []} {...data} updateFields={updateFields} />,
    <PropertyFieldConfig {...data} updateFields={updateFields} />
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const groupedPropertyFields = groupFields();
    const submitData = {
      type_id: data.type_id,
      property_id: data.property_id,
      name: data.name !== '' ? data.name : `undefined-${new Date().getUTCMilliseconds()}`,
      label: data.label !== '' ? data.label : `undefined-${new Date().getUTCMilliseconds()}`,
      sequence: data.sequence,
      default_value: data.default_value,
      fields: Object.entries(groupedPropertyFields!).map(([_, propertyField]) => {
        return {
          property_field_id: propertyField.id,
          item_value:
            propertyField.default_value &&
            propertyField.field?.input_type != 'Text' &&
            propertyField.field?.input_type != 'TextArea'
              ? propertyField.default_value
              : propertyField.item_value
        };
      })
    };

    await typeApi.createTypeProperty(companyName ?? '', submitData).then((data) => {
      if (data) {
        toast({
          title: 'Success',
          description: `A property of ${submitData.name} has been added successfully`
        });
        navigate(`/${companyName}/setting/object-manager/${typeId}?tab=properties`);
      } else {
        toast({
          title: 'Unsuccessful',
          description: `An error has occured while adding a property of ${submitData.name}`,
          variant: 'destructive'
        });
      }
      setIsSubmitting(false);
    });
  };

  return (
    <>
      <Panel className={cn('m-0 h-full px-4 py-6')}>
        <form className='grid h-full grid-cols-1' onSubmit={handleSubmit}>
          <div className='my-4 flex overflow-y-auto px-4 py-4'>
            <div className='flex-grow '>
              <div className='mb-6 flex items-baseline space-x-2'>
                <h2 className='flex-shrink-0 text-[1.3rem]'>
                  {isFirstStep ? 'Choose Type Property' : properties?.find((p) => p.id === data.property_id)?.name}
                </h2>
                <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
              </div>
              <div>{step}</div>
            </div>
          </div>
          <div className='my-auto flex w-full items-center justify-end gap-2 px-2 py-4'>
            <Button
              onClick={() => {
                if (isFirstStep) {
                  navigate(`/${companyName}/setting/object-manager/${typeId}?tab=properties`);
                } else {
                  back();
                }
              }}
            >
              {isFirstStep ? 'Cancel' : 'Back'}
            </Button>
            <Button
              intent='primary'
              type={'button'}
              className={cn(isLastStep && 'hidden')}
              disabled={!checkStepFinished(currentStepIndex)}
              onClick={() => {
                if (isFirstStep) {
                  setData({
                    ...data,
                    fields: properties?.find((property) => property.id === data.property_id)?.propertyFields ?? []
                  });
                  next();
                }
              }}
            >
              Next
            </Button>
            <Button
              intent='primary'
              type={'submit'}
              className={cn(!isLastStep && 'hidden')}
              disabled={!checkStepFinished(currentStepIndex)}
            >
              {isSubmitting ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div>
                    <LoadingSpinnerSmall className='h-5 w-5 fill-on-primary' />
                  </div>
                  <p className='font-semibold'> Please wait...</p>
                </div>
              ) : (
                <p className='font-semibold'>Add Type Property</p>
              )}
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default PropertySetting;
