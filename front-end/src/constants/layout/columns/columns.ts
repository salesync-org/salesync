import { createTableLayout as createAccountLayout } from './account-columns';
import { createTableLayout as createContactLayout } from './contact-columns';
import { createTableLayout as createLeadLayout } from './lead-columns';
import { createTableLayout as createOpportunityLayout } from './opportunity-columns';

export const layoutColumns = [
  {
    id: 'f4828793-28c2-465b-b783-0c697e41dafb',
    createColumn: createLeadLayout
  },
  {
    id: '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88',
    createColumn: createContactLayout
  },
  {
    id: '27d0c628-94c2-4650-828f-3c26e61bb692',
    createColumn: createAccountLayout
  },
  {
    id: '9515a156-82c1-49aa-bc6c-824c02f20da5',
    createColumn: createOpportunityLayout
  }
];
