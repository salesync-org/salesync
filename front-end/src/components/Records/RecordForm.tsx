/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/utils/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, ErrorText, TextArea, TextInput } from '../ui';
import { ScreenLoading } from '../ui/Loading/LoadingSpinner';
import PickList from './PickList';

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
    setValue,
    control,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: currentData,
    mode: 'all'
  });

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
    const fields = property.fields;
    let isRequired = false;
    let maxLength = 255;

    if (fields) {
      fields.forEach((field: any) => {
        if (field.property_field.label === 'Required') isRequired = field.item_value === 'true';
        if (field.property_field.label === 'Length') maxLength = parseInt(field.item_value as string) || 255;
      });
    }

    let errorMessage = '';
    if (errors[property.name]?.type === 'required') {
      errorMessage = 'This field is required';
    } else if (errors[property.name]?.type === 'maxLength') {
      errorMessage = `Max length is ${maxLength}`;
    } else if (errors[property.name]?.type === 'pattern') {
      errorMessage = 'Invalid input';
    }

    const ErrorComponent = () => <ErrorText className='mt-1' text={errorMessage}></ErrorText>;
    return {
      Text: (
        <div>
          <TextInput
            {...props}
            isError={!!errors[property.name]}
            validation={{ required: isRequired, maxLength }}
          ></TextInput>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      Phone: (
        <div>
          <TextInput
            {...props}
            type='tel'
            isError={!!errors[property.name]}
            validation={{ pattern: /^\+?[0-9]{1,3}-?[0-9]{3,14}$/ }}
          ></TextInput>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      Email: (
        <div>
          <TextInput
            {...props}
            type='email'
            isError={!!errors[property.name]}
            validation={{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
          ></TextInput>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      Number: (
        <div>
          <TextInput
            {...props}
            type='number'
            isError={!!errors[property.name]}
            validation={{ pattern: /^[0-9]+$/ }}
          ></TextInput>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      Date: (
        <div>
          <TextInput
            {...props}
            type='date'
            isError={!!errors[property.name]}
            validation={{ pattern: /^\d{4}-\d{2}-\d{2}$/ }}
            inputClassName='pr-10'
          ></TextInput>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      DateTime: (
        <TextInput
          {...props}
          type='datetime-local'
          isError={!!errors[property.name]}
          validation={{ pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/ }}
          inputClassName='pr-10'
        ></TextInput>
      ),
      TextArea: (
        <div>
          <TextArea
            {...props}
            className='w-full'
            isError={!!errors[property.name]}
            validation={{ required: isRequired, maxLength }}
            isRequired={isRequired}
          ></TextArea>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      URL: (
        <div>
          <TextInput
            {...props}
            isError={!!errors[property.name]}
            validation={{
              pattern: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
            }}
          ></TextInput>
          {errorMessage && <ErrorComponent></ErrorComponent>}
        </div>
      ),
      Checkbox: (
        <Controller
          control={control}
          name={property.name}
          render={({ field: { value } }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              setValue(property.name, value ? 'true' : 'false');
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            return (
              <div className='flex items-center gap-2'>
                <label htmlFor={property.id}>{property.label}</label>
                <Checkbox
                  id={property.id}
                  checked={value === 'true'}
                  onCheckedChange={(checked) => setValue(property.name, checked ? 'true' : 'false')}
                ></Checkbox>
              </div>
            );
          }}
        />
      ),
      PickList: (
        <>
          <p className={cn('my-1')}>{property.label}</p>
          <Controller
            control={control}
            name={property.name}
            render={({ field: { value, onChange } }) => {
              const fields: FieldItem[] = property.fields;
              const items = fields
                .find((field) => field.property_field.label === 'Values (Separated by lines)')
                ?.item_value.split(/[\r\n]|\|\n|\\n/g);

              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                const defaultValue = fields.find((field) => field.property_field.label === 'Default Value')?.item_value;
                setValue(property.name, value || defaultValue || '');
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);
              return <PickList value={value} onChange={onChange} items={items} />;
            }}
          />
        </>
      )
    };
  };

  const onFormSubmit = (data: Record<string, string>) => {
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
          <>
            <p className={cn('my-1')}>{'Current Stage'}</p>
            <Controller
              control={control}
              name='stage'
              render={({ field: { onChange } }) => {
                const items = stages.map((stage) => {
                  return stage.name;
                });
                return (
                  <PickList
                    onChange={(value) => {
                      onChange(stages.find((stage) => stage.name === value)?.id);
                    }}
                    items={items ?? []}
                  />
                );
              }}
            />
          </>
        )}
      </div>
    </form>
  );
};
export default RecordForm;
