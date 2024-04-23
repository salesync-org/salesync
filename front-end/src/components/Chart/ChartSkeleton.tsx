import { Panel, Skeleton } from '../ui';

const ChartSkeleton = () => {
  return (
    <Panel>
      <section className='flex h-full flex-col'>
        <Skeleton className='mb-4' width='50%' borderRadius='4px'></Skeleton>
        <Skeleton className='mb-4' width='100%' height='32px' borderRadius='4px'></Skeleton>
        <div className='flex h-full w-full flex-grow justify-center gap-10'>
          <Skeleton width='160px' height='160px' borderRadius='50%' />
          <Skeleton width='32px' height='160px' borderRadius='4px' />
        </div>
      </section>
    </Panel>
  );
};
export default ChartSkeleton;
