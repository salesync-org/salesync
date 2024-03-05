import { ReactNode } from 'react';

function TypographyStyle({ description, children }: { description: string; children: ReactNode }) {
  return (
    <div className='my-4 max-w-56'>
      <div className='mb-0 flex h-8 items-center truncate text-ellipsis'>{children}</div>
      <p className='truncate text-wrap text-left align-top'>{description}</p>
    </div>
  );
}

export default TypographyStyle;
