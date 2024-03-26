import React from 'react';
import { Item } from '..';

interface DropDownItemProps {
  value: string;
  title: string;
  children?: React.ReactNode;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ value, title, children }) => {
  return (
    <div>
      <input defaultValue={value} value={value} className='hidden' title={title} onChange={()=>{}} tabIndex={-1}></input>
      {children ? children : <Item title={title}></Item>}
    </div>
  );
};

export default DropDownItem;