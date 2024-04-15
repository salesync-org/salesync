import { useMemo } from 'react';
import Stage from './Stage';
import { cn } from '@/utils/utils';
import { Stage as StageType } from '@/type';

interface StagesProps {
  stages: StageType[];
  currentStage: string;
  stageIdChosen: string;
  setStageIdChosen: (stageId: string) => void;
  isLoading: boolean;
}

const Stages = ({ stages, currentStage, stageIdChosen, setStageIdChosen, isLoading }: StagesProps) => {
  const findIndex = useMemo(() => stages.findIndex((stage) => stage.id === currentStage), [stages, currentStage]);

  return (
    <ul className={cn('flex items-center gap-[4px]', isLoading && 'pointer-events-none select-none opacity-80')}>
      {stages.map((stage, index) => (
        <li className='flex-1 text-center' key={stage.id}>
          <Stage
            stage={stage}
            isFirst={index === 0}
            isLast={index === stages.length - 1}
            isCurrentStage={currentStage === stage.id}
            setStageIdChosen={setStageIdChosen}
            stageIdChosen={stageIdChosen}
            isCompleted={findIndex > index}
          />
        </li>
      ))}
    </ul>
  );
};
export default Stages;
