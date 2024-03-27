import { useState } from 'react';
import Stage from './Stage';

interface StagesProps {
  stages: Stage[];
  currentStage: string;
}

const Stages = ({ stages, currentStage }: StagesProps) => {
  const [stageIdChosen, setStageIdChosen] = useState(currentStage);

  const findIndex = stages.findIndex((stage) => stage.id === currentStage);

  return (
    <ul className='flex items-center gap-[4px]'>
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
