import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSearchParams(search: string) {
  const searchParams = new URLSearchParams(search);
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

export const formatCompanyName = (name: string) => {
  return name.split(' ').join('').toLowerCase();
}

export const formatRecords = (records: RecordResponse[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedRecords: any = new Array(records.length).fill({});

  for (let i = 0; i < records.length; i++) {
    formattedRecords[i]['Name'] = records[i].name;

    for (const property of records[i].properties) {
      formattedRecords[i][property.record_type_property_label] = property.item_value;
    }
  }

  return formattedRecords;
};
