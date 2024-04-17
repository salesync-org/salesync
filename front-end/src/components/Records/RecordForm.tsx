import { Stage } from '@/type';
import { cn } from '@/utils/utils';
import { Controller, useForm } from 'react-hook-form';
import { DropDown, DropDownItem, Item, TextArea, TextInput } from '../ui';
import { ScreenLoading } from '../ui/Loading/LoadingSpinner';

type RecordFormProps = {
  currentData: Record<string, string>;
  onSubmit: (data: Record<string, string>) => void;
  stages?: Stage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeProperty?: any;
  formId: string;
};

const RecordForm = ({ currentData = {}, onSubmit, stages, typeProperty, formId }: RecordFormProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: currentData
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
    return {
      Text: <TextInput {...props}></TextInput>,
      Phone: <TextInput {...props} type='tel'></TextInput>,
      Email: <TextInput {...props} type='email'></TextInput>,
      Number: <TextInput {...props} type='number'></TextInput>,
      DateTime: <TextInput {...props} type='date'></TextInput>,
      TextArea: <TextArea {...props} className='h-[100px] w-full'></TextArea>
    };
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        '-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden pb-32',
        isSubmitting && 'pointer-events-none opacity-80'
      )}
    >
      {isSubmitting && <ScreenLoading />}
      <div className='flex w-full flex-col place-content-center gap-2   p-6'>
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
