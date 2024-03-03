import Icon from '@/components/ui/Icon/Icon';
import { Link } from 'react-router-dom';

import TypeDetailField from './TypeDetailField/TypeDetailField';
import TypeDetailLink from './TypeDetailLink/TypeDetailLink';

const TypeDetail = () => {
  return (
    <div className='mx-auto flex w-full max-w-[676px] flex-col gap-6 rounded-md bg-panel-light px-6 py-5 dark:bg-panel-dark'>
      <div className='flex items-center text-link-text-light dark:text-link-text-dark'>
        <Icon name='chevron_left' />
        <Link to='#' className='text-sm leading-4 underline'>
          Go back
        </Link>
      </div>
      <h1 className='text-2xl font-bold leading-7'>Account Type</h1>
      <TypeDetailField />
      <TypeDetailLink />
    </div>
  );
};
export default TypeDetail;
