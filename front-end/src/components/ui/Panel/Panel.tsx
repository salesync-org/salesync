import React from 'react';

const Panel = ({ children }: { children: React.ReactNode }) => {
  return <div className='m-4 rounded-lg px-10 py-12 backdrop-blur-2xl border-[1px] z-[0] border-input-stroke dark:border-input-stroke-dark bg-panel/80 dark:bg-panel-dark/80'>{children}</div>;
};

export default Panel;
