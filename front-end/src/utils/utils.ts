import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { read, utils, writeFile } from 'xlsx';

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

  localStorage.setItem('records', JSON.stringify(formattedRecords));

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

export const createTemplate = (properties: any[]) => {
  return properties.reduce((acc, property) => {
    return { ...acc, [property.name]: '' };
  }, {});
};

export const exportToExcel = (data: unknown[]) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');

  const name = `template-${new Date().toLocaleString()}.xlsx`;
  writeFile(wb, name);
};

export const importFromExcel = async (file: File, callback: (jsonData: any) => Promise<void>) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer);
    const workbook = read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(sheet);
    await callback(jsonData);
  };

  reader.readAsArrayBuffer(file);
};
export const exportTableTemplate = (properties: any[]) => {
  const template = createTemplate(properties);

  exportToExcel([template]);

  return template;
};
