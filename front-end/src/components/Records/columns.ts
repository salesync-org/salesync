import { ColumnDef } from '@tanstack/react-table';

export type Sale = {
  id: string;
  index: number;
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  leadStatus: string;
  ownerAlias: string;
};

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'index',
    header: ''
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'title',
    header: 'Tile'
  },
  {
    accessorKey: 'company',
    header: 'Company'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'leadStatus',
    header: 'Lead Status'
  },
  {
    accessorKey: 'ownerAlias',
    header: 'Owner Alias'
  }
];
