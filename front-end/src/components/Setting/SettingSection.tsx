import React from 'react';

interface SettingSectionProps {
  children: React.ReactNode;
  title: string;
}

const SettingSection = ({ children, title }: SettingSectionProps) => {
  return (
    <section>
      <h2 className='mb-3 border-b-[1px] border-[#D9D9D9] pb-3 text-lg font-semibold leading-5 dark:border-[#494949]'>
        {title}
      </h2>
      <ul className='flex flex-col'>{children}</ul>
    </section>
  );
};
export default SettingSection;
