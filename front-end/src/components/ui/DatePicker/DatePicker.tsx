import React, { Dispatch, useEffect, useRef, useState } from 'react';
import buttonVariants from 'ui/Button/ButtonProps';
import { cn } from '@/utils/utils';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
// import { textErrorClassName } from '../ErrorText/ErrorText';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useClickOutside from '@/hooks/useClickOutside';

interface DatePickerProps {
  value: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  onValueChange?: (value: string) => void;
  header?: string;
  showHeader?: boolean;
  isError?: boolean;
  setError?: Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  className,
  onValueChange = () => {},
  name,
  header,
  isError = false,
  // setError,
  disabled,
  showHeader = true
}) => {
  // const { isOpen, setIsOpen, shoulDropUp, selectedOption, setSelectedOption, buttonContentRef, buttonRef, menuRef } =
  //   useDropDown();

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useClickOutside([listRef], () => {
    setIsOpen(false);
  });
  const [isOpen, setIsOpen] = useState(false);

  const [dateValue, setDateValue] = useState(value ?? format(new Date(), 'yyyy/MM/dd'));
  const [selected, setSelected] = useState<Date>();
  useEffect(() => {
    if (selected) {
      setDateValue(format(selected, 'yyyy/MM/dd'));
      onValueChange(format(selected, 'yyyy/MM/dd'));
    }
    setIsOpen(false);
  }, [selected]);

  return (
    <>
      {showHeader && header && <p className={cn('my-1')}>{header}</p>}
      <div ref={listRef} className='dropdown relative w-full'>
        <div className={cn('relative h-10', className)}>
          <input
            ref={inputRef}
            className={cn(
              buttonVariants({ intent: 'normal' }),
              'flex items-center justify-center space-x-1 hover:cursor-pointer',
              isError && 'border-red-400 ring-1 ring-red-300',
              'absolute left-0 right-0'
            )}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            disabled={disabled}
            name={name}
            type='button'
            value={dateValue}
          ></input>
          <Calendar className='absolute bottom-4 left-4 top-3' size={'1rem'} />
        </div>
        <div
          style={{
            position: 'fixed',
            top: inputRef.current ? `${inputRef.current?.getBoundingClientRect().top + 35}px` : '1/2',
            bottom: '10px',
            overflow: 'scroll'
          }}
          className={cn(
            'z-[100] max-h-[320px] max-w-[310px] rounded border-2 border-input-stroke-light bg-button-background-light shadow-lg shadow-background-dark/5 dark:border-input-stroke-dark dark:bg-button-background-dark',
            !isOpen && 'hidden'
          )}
        >
          <DayPicker mode='single' className='' selected={selected} onSelect={setSelected} />
        </div>
      </div>
      <div
        className={cn('fixed bottom-0 left-0 right-0 top-0 z-[99] overflow-hidden opacity-0', !isOpen && 'hidden')}
      ></div>
    </>
  );
};

export default DatePicker;
