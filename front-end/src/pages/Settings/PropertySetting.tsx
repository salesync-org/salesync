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
      return { ...prev, ...updatedFields };
    });
  }
  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <PropertyManager propertyList={properties ?? []} {...data} updateFields={updateFields} />,
    <PropertyFieldConfig {...data} updateFields={updateFields} />
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const groupedPropertyFields = data!.fields!.reduce((acc: Record<string, PropertyField>, field) => {
      setIsSubmitting(true);
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
          item_value: propertyField.default_value ? propertyField.default_value : propertyField.item_value
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
              disabled={!data.property_id}
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
              disabled={!data.property_id}
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
