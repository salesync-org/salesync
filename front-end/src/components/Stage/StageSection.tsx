import { Button, Icon } from '../ui';
import Stages from './Stages';

interface StageSectionProps {
  stage: {
    stages: Stage[];
    currentStage: string;
  };
}

const StageSection = ({ stage: { stages, currentStage } }: StageSectionProps) => {
  return (
    <div>
      <Stages currentStage={currentStage} stages={stages} />
      <div className='mt-4 flex items-center justify-between text-[13px]'>
        <h3>Status: {stages.find((stage) => stage.id === currentStage)?.name}</h3>
        <Button intent='primary' className='py-0'>
          <Icon name='check' />
          <span className='text-xs'>Mark Status as Complete</span>
        </Button>
      </div>
    </div>
  );
};
export default StageSection;
