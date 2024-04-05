import React from 'react';
import { DropDownItem, Item } from '../ui';
import { cn } from '@/utils/utils';

interface ItemTypeProps {
  name: string;
  color: string;
}

const ItemType: React.FC<ItemTypeProps> = ({ name, color }) => {
  let title = '';
  if (name === 'lead') title = 'Leads';
  if (name === 'contact') title = 'Contacts';
  if (name === 'account') title = 'Accounts';
  if (name === 'asset_relationship') title = 'Asset Relationships';
  if (name === 'asset') title = 'Assets';
  if (name === 'campaign') title = 'Campaigns';
  if (name === 'case') title = 'Cases';
  if (name === 'communication_subscription_consent') title = 'Communication Subscription Consents';
  if (name === 'contact_request') title = 'Contact Requests';
  if (name === 'image') title = 'Images';
  if (name === 'list_email') title = 'List Emails';
  if (name === 'operating_hours_holiday') title = 'Operating Hours Holidays';
  if (name === 'opportunity') title = 'Opportunities';
  if (name === 'party_consent') title = 'Party Consents';
  if (name === 'product') title = 'Products';

  return (
    <DropDownItem title='' value={name}>
      <Item
        icon={
          <img
            className={cn('mx-2 h-[20px] w-[20px] rounded-sm', color)}
            src={`/src/assets/type-icon/${name}_icon.png`}
            alt='icon'
          />
        }
        title={title}
        wrapTitle={false}
      />
    </DropDownItem>
  );
};

export default ItemType;
