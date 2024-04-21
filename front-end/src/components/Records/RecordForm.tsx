import { cn } from '@/utils/utils';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, DropDown, DropDownItem, Item, TextArea, TextInput } from '../ui';
import { ScreenLoading } from '../ui/Loading/LoadingSpinner';

type RecordFormProps = {
  currentData?: Record<string, string>;
  onSubmit: (data: Record<string, string>) => void;
  stages?: Stage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeProperty?: any;
  formId?: string;
  className?: string;
};

const RecordForm = ({ currentData = {}, onSubmit, stages, typeProperty, formId = '', className }: RecordFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { isSubmitting, errors, isDirty }
  } = useForm({
    defaultValues: currentData,
    mode: 'all'
  });
  console.log(isDirty, formId, getValues());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTypePropertyInput = (property: any) => {
    const props = {
      className: 'w-full',
      header: property.label,
      key: property.id,
      placeholder: property.label,
      register: register,
      name: property.name
    };

    return {
      Text: <TextInput {...props} isError={!!errors[property.name]} validation={{ minLength: 1 }}></TextInput>,
      // Text: <TextInput {...props} {...field}></TextInput>,

      Phone: <TextInput {...props} type='tel' isError={!!errors[property.name]}></TextInput>,
      Email: (
        <TextInput
          {...props}
          type='email'
          isError={!!errors[property.name]}
          validation={{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
        ></TextInput>
      ),
      Number: <TextInput {...props} type='number' isError={!!errors[property.name]}></TextInput>,
      DateTime: <TextInput {...props} type='datetime-local' isError={!!errors[property.name]}></TextInput>,
      TextArea: <TextArea {...props} className='h-[100px] w-full'></TextArea>,
      Checkbox: <Checkbox></Checkbox>
    };
  };

  const onFormSubmit = (data: Record<string, string>) => {
    console.log({ formId, data });
    onSubmit(data);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onFormSubmit)}
      className={cn('w-full overflow-x-hidden pb-32', isSubmitting && 'pointer-events-none opacity-80', className)}
    >
      {isSubmitting && <ScreenLoading />}
      <div className='flex w-full flex-col place-content-center gap-2 px-6 py-2'>
        {typeProperty ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          typeProperty.properties?.map((property: any) => {
            if (property.property.name)
              return (
                renderTypePropertyInput(property)[property.property.name as keyof typeof renderTypePropertyInput] ?? (
                  <div key={property.id}></div>
                )
              );
            else return <div></div>;
          })
        ) : (
          <div>loading</div>
        )}
        {stages && stages?.length > 0 && (
          <Controller
            control={control}
            name='stage'
            render={({ field: { onChange, value } }) => (
              <DropDown header='Status' value={value} onValueChange={onChange}>
                {stages.map((stage: Stage) => (
                  <DropDownItem title={stage.name} value={stage.id} key={stage.id}>
                    <Item title={stage.name}></Item>
                  </DropDownItem>
                ))}
              </DropDown>
            )}
          />
        )}
      </div>
    </form>
  );
};
export default RecordForm;
