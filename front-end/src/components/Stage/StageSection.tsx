import { useState } from 'react';
import { Button, Icon } from '../ui';
import Stages from './Stages';
import { useToast } from '../ui/use-toast';
import recordApi from '@/api/record';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

interface StageSectionProps {
  stage: {
    stages: Stage[];
    currentStage: string;
  };
}

const StageSection = ({ stage: { stages, currentStage } }: StageSectionProps) => {
  const [stageIdChosen, setStageIdChosen] = useState(currentStage);

  const { toast } = useToast();
  const { recordId = '' } = useParams();
  const queryClient = useQueryClient();

  const handleMarkStatusAsComplete = async () => {
    try {
      if (!recordId || !stageIdChosen) return;

      const res = await recordApi.updateRecordStage(recordId, stageIdChosen);

      if (res) {
        queryClient.setQueryData(['record', recordId], (data: any) => {
          console.log({ data });
          return {
            ...data,
            stage: {
              ...data.stage,
              currentStage: stageIdChosen
            }
          };
        });

        toast({
          title: 'Success',
          description: 'Status marked as complete successfully'
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while marking status as complete',
        variant: 'destructive'
      });
    }
  };

  if (!recordId) return null;

  return (
    <>
      <Stages
        currentStage={currentStage}
        stages={stages}
        stageIdChosen={stageIdChosen}
        setStageIdChosen={setStageIdChosen}
      />
      <div className='mt-4 flex items-center justify-between text-[13px]'>
        <h3>Status: {stages.find((stage) => stage.id === currentStage)?.name}</h3>
        <Button intent='primary' className='py-0' onClick={handleMarkStatusAsComplete}>
          <Icon name='check' />
          <span className='text-xs'>Mark Status as Complete</span>
        </Button>
      </div>
    </>
  );
};
export default StageSection;
