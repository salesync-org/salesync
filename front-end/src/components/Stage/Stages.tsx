import { cn } from '@/utils/utils';
import { spawn } from 'child_process';

const stages = [
  {
    id: '1',
    name: 'New'
  },
  {
    id: '2',
    name: 'Contacted'
  },
  {
    id: '3',
    name: 'Nurturing'
  },
  {
    id: '4',
    name: 'Unqualified'
  },
  {
    id: '5',
    name: 'Converted'
  }
];

const Stages = () => {
  return (
    <ul className='flex items-center gap-[4px]'>
      {stages.map((stage, index) => (
        <li className='flex-1 text-center' key={stage.id}>
          <Stage stage={stage} isFirst={index === 0} isLast={index === stages.length - 1} />
        </li>
      ))}
    </ul>
  );
};
export default Stages;

interface StageProps {
  stage: Stage;
  isFirst?: boolean;
  isLast?: boolean;
}
const Stage = ({ stage, isFirst, isLast }: StageProps) => {
  return (
    <div
      className={cn(
        'group relative z-20 grid h-8 w-full cursor-pointer place-content-center text-[13px] transition-all'
      )}
    >
      {isFirst && (
        <span className='absolute -left-4 bottom-0 top-0 z-[11] aspect-square h-full rounded-full bg-slate-100 transition group-hover:bg-slate-300'></span>
      )}
      <span className='absolute top-0 z-10 h-4 w-full skew-x-[20deg] bg-slate-100 transition-all group-hover:bg-slate-300'></span>
      <span className={cn('relative z-20', isFirst && 'pr-1', isLast && 'pl-1')}>{stage.name}</span>
      <span className='absolute bottom-0 z-10 h-4 w-full -skew-x-[20deg] bg-slate-100 transition-all group-hover:bg-slate-300'></span>
      {isLast && (
        <span className='absolute -right-4 bottom-0 top-0 z-[11] aspect-square h-full rounded-full bg-slate-100 transition group-hover:bg-slate-300'></span>
      )}
    </div>
  );
};
