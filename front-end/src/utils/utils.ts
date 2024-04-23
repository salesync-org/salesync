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
};

export const formatRecords = (records: RecordResponse[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedRecords: any[] = [];

  for (let i = 0; i < records.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedRecord: any = {};

    formattedRecord['id'] = records[i].id;
    formattedRecord['Name'] = records[i].name;

    for (const property of records[i].properties) {
      formattedRecord[property.property_name] = property.item_value;
    }

    formattedRecords.push(formattedRecord);
  }

  return formattedRecords;
};

export const getCompanyName = (index?: number) => {
  const url = window.location.pathname;
  const urlParts = url.split('/');
  return urlParts[index ?? 1];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertTypePropertyToCurrentData = (typeProperties: any[]) => {
  const currentData: Record<string, string> = {};

  for (const property of typeProperties) {
    currentData[property.name] = '';
  }

  return currentData;
};

export const generateChartColor = (size: number) => {
  const backgroundColor = [];
  const borderColor = [];
  const MIN = 255;
  for (let i = 0; i < size; i++) {
    const r = Math.floor(Math.random() * MIN);
    const g = Math.floor(Math.random() * MIN);
    const b = Math.floor(Math.random() * MIN);

    backgroundColor.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
    borderColor.push(`rgba(${r}, ${g}, ${b}, 1)`);
  }

  return { backgroundColor, borderColor };
};
