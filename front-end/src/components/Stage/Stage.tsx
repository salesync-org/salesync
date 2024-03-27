import { cn } from '@/utils/utils';
import { Icon } from '../ui';

interface StageProps {
  stage: Stage;
  isFirst?: boolean;
  isLast?: boolean;
  isCurrentStage: boolean;
  stageIdChosen: string;
  setStageIdChosen: (stageId: string) => void;
  isCompleted: boolean;
}
const Stage = ({
  stage,
  isFirst,
  isLast,
  isCurrentStage,
  stageIdChosen,
  setStageIdChosen,
  isCompleted
}: StageProps) => {
  let colors;

  const isChosen = stageIdChosen === stage.id;

  if (isChosen) {
    colors = 'bg-blue-900 text-white group-hover:bg-blue-950';
  } else if (isCompleted) {
    colors = 'bg-green-700 text-white group-hover:bg-green-800';
  } else if (isCurrentStage) {
    colors = 'bg-white text-blue-800';
  } else {
    colors = 'bg-slate-100 group-hover:bg-slate-300';
  }

  return (
    <div
      className={cn(
        'group relative z-20 grid h-8 w-full cursor-pointer place-content-center text-[13px] transition-all'
      )}
      onClick={() => setStageIdChosen(stage.id)}
    >
      {isFirst && (
        <span
          className={cn(
            'absolute -left-4 bottom-0 top-0 z-[11] aspect-square h-full rounded-s-full bg-slate-100 transition-all group-hover:bg-slate-300',
            colors,
            isCurrentStage && 'border-2 border-r-0 border-blue-800'
          )}
        ></span>
      )}

      <span
        className={cn(
          'absolute top-0 z-10 h-4 w-full skew-x-[28deg] bg-slate-100 transition-all group-hover:bg-slate-300',
          colors,
          isCurrentStage && 'border-2 border-b-0 border-blue-800'
        )}
      ></span>

      <span
        className={cn(
          'relative z-20 grid place-content-center overflow-hidden transition-all',
          isFirst && 'pr-2',
          isLast && 'pl-2',
          colors,
          'bg-transparent'
        )}
      >
        <Icon name='check' className={cn('', (!isCompleted || isChosen) && 'hidden', 'group-hover:hidden')} />
        <span
          className={cn('text-[13px]', isCompleted && 'hidden transition-all group-hover:block', isChosen && 'block')}
        >
          {stage.name}
        </span>
      </span>
      <span
        className={cn(
          'absolute bottom-0 z-10 h-4 w-full -skew-x-[28deg] bg-slate-100 transition-all group-hover:bg-slate-300',
          colors,
          isCurrentStage && 'border-2 border-t-0 border-blue-800'
        )}
      ></span>
      {isLast && (
        <span
          className={cn(
            'absolute -right-4 bottom-0 top-0 z-[11] aspect-square h-full rounded-e-full bg-slate-100 transition-all group-hover:bg-slate-300',
            colors,
            isCurrentStage && 'border-2 border-l-0 border-blue-800'
          )}
        ></span>
      )}
    </div>
  );
};

export default Stage;
