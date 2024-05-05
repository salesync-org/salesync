import React, { FocusEvent, useState } from 'react';
import { Icon } from '@/components/ui';
import { cn } from 'utils/utils';

interface CurrencyProps {
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (s: string) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  header?: string;
  showHeader?: boolean;
  prefixIcon?: string;
  isError?: boolean;
  defaultValue?: string;
  min?: number;
  restProps?: React.HTMLAttributes<HTMLInputElement>;
}

const currencyList: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  RUB: '₽',
  INR: '₹',
  CNY: '¥',
  TRY: '₺',
  KRW: '₩',
  ZAR: 'R',
  VND: '₫'
};

const Currency: React.FC<CurrencyProps> = ({
  value,
  placeholder,
  className,
  disabled = false,
  header,
  showHeader = true,
  defaultValue,
  min,
  prefixIcon,
  isError = false,
  onChange,
  name = '',
  register = () => ({}),
  ...restProps
}) => {
  const [currency, setCurrency] = useState<string | null>(null);
  let inputValue = '0';
  if (defaultValue && currency == null) {
    const defaultCurrency = defaultValue!.at(0)!;
    const currencyName = Object.entries(currencyList).filter(([_, v]) => v === defaultCurrency);
    if (currencyName.length > 0) {
      setCurrency(currencyName.at(0)![0]);
      inputValue = defaultValue!.slice(1);
    }
  }
  return (
    <div>
      {showHeader && header && <p className={cn('my-1', isError && 'font-medium text-red-500')}>{header}</p>}
      <div
        className={cn('flex', 'h-10 rounded border-[2px] border-input-stroke-light  dark:border-input-background-dark')}
      >
        <select
          className={cn('rounded-l px-4')}
          defaultValue={currency?.toString()}
          onChange={(e) => {
            setCurrency(e.currentTarget.value);
          }}
        >
          {Object.entries(currencyList).map(([currency, _]) => (
            <option key={currency} value={currency} label={`${currency}`}></option>
          ))}
        </select>
        <div
          className={cn(
            'relative flex w-64 items-center justify-start align-middle',
            disabled && 'opacity-80',
            'transform-all duration-[50ms] ease-in-out',
            'placeholder:text-opacity-50',
            'rounded-l-none bg-input-background-light dark:bg-input-background-dark',
            !disabled && 'dark:hover:bg-button-background-dark',
            isError && 'border-red-400 ring-1 ring-red-300',
            className
          )}
        >
          <div className='absolute ml-2 w-full bg-transparent py-2 pr-2 '>{currencyList[currency ?? 'USD']}</div>
          <input
            type='number'
            placeholder={placeholder}
            className={cn(
              'absolute h-full w-full rounded bg-transparent py-2 pr-2 placeholder:text-ellipsis placeholder:text-[13px] placeholder:text-opacity-50 focus:outline-primary',
              prefixIcon ? 'pl-14' : 'pl-8',
              isError && 'placeholder:font-medium placeholder:text-red-500 focus-visible:outline-red-400'
            )}
            disabled={disabled}
            onChange={(e) => onChange!(`${currencyList[e.currentTarget.value].toString()}${e.target.value}`)}
            {...register(name)}
            name={name}
            defaultValue={inputValue}
            min={min}
            {...restProps}
          />
          <div className='relative flex h-full items-center justify-start rounded px-4'>
            <div className=' absolute bottom-0 top-0 flex w-4 items-center'>
              {prefixIcon && <Icon className='' name={prefixIcon} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
