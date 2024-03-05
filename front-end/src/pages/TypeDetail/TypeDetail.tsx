import Icon from '@/components/ui/Icon/Icon';
import useLink from '@/hooks/type-service/useLinks';
import { Link, useParams } from 'react-router-dom';
import TypeDetailLink from './TypeDetailLink/TypeDetailLink';
import TypeDetailField from './TypeDetailField/TypeDetailField';

const TypeDetail = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, isLoading } = useLink(id);

  return (
    <div className='mx-auto flex w-full max-w-[676px] flex-col gap-6 rounded-md bg-panel-light px-6 py-5 dark:bg-panel-dark'>
      <div className='flex items-center text-link-text-light dark:text-link-text-dark'>
        <Icon name='chevron_left' />
        <Link to='#' className='text-sm leading-4 underline'>
          Go back
        </Link>
      </div>
      <h1 className='text-2xl font-bold leading-7'>
        {data?.[0]?.source_type?.name ? data[0].source_type.name : '...'} Type
      </h1>
      <TypeDetailField />
      <TypeDetailLink />
    </div>
  );
};
export default TypeDetail;
