import { Button, Icon } from '@/components/ui';
import React, { useState } from 'react';
import { cn } from 'utils/utils';
import InputProperty from './InputProperty';

interface GroupPropertyProps {
  name?: string;
  data?: Array<any>;
  className?: string;
  restProps?: React.HTMLAttributes<HTMLInputElement>;
}

const GroupProperty: React.FC<GroupPropertyProps> = ({ name, className, data}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className={cn(className)}>
      <Button className='flex w-full justify-start' onClick={() => setExpand(!expand)}>
        {expand && <Icon name='expand_more' size='1' />}
        {!expand && <Icon name='chevron_right' size='1' />}
        <span>{name}</span>
      </Button>
      {expand &&
        data!.map((item) => (
          <>
            <InputProperty name={item.name} value={item.value} />
          </>
        ))}
    </div>
  );
};

export default GroupProperty;
