import recordApi from '@/api/record';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Icon } from '../ui';
import { useToast } from '../ui/use-toast';
import Stages from './Stages';

interface StageSectionProps {
  stage: {
    stages: Stage[];
    currentStage: string;
  };
}

const lastStages = {
  lead: {
    id: '5',
    name: 'Converted',
    title: 'Select Convert Status',
    modalName: MODAL_TYPES.CREATE_RECORD_MODAL
  }
};

const StageSection = ({ stage: { stages, currentStage } }: StageSectionProps) => {
  const [stageIdChosen, setStageIdChosen] = useState(currentStage);

  const { toast } = useToast();
  const { recordId = '' } = useParams();
  const queryClient = useQueryClient();
  const { showModal } = useGlobalModalContext();

  const lastStage = lastStages['lead'];
  const updatedStages = useMemo(
    () => [
      ...stages,
      {
        id: lastStage.id,
        name: lastStage.name
      }
    ],
    [lastStage.id, lastStage.name, stages]
  );

  const handleUpdateStage = async (recordId: string, stageId: string) => {
    const res = await recordApi.updateRecordStage(recordId, stageId);

    if (res) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['record', recordId], (data: any) => {
        return {
          ...data,
          stage: {
            ...data.stage,
            currentStage: stageId
          }
        };
      });

      setStageIdChosen(stageId);

      toast({
        title: 'Success',
        description: 'Status marked as complete successfully'
      });
    }
  };

  const handleMarkStatusAsCurrent = async () => {
    try {
      await handleUpdateStage(recordId, stageIdChosen);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while marking status as current',
        variant: 'destructive'
      });
    }
  };

  const handleMarkStatusAsComplete = async () => {
    try {
      if (!recordId || !stageIdChosen) return;
      const findIndex = updatedStages.findIndex((stage) => stage.id === stageIdChosen);

      if (findIndex < 0) {
        throw new Error("Can't find the stage");
      }

      const newStage = updatedStages[findIndex + 1];

      await handleUpdateStage(recordId, newStage.id);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while marking status as complete',
        variant: 'destructive'
      });
    }
  };

  const handleSelectStatus = () => {
    showModal(lastStage.modalName, { typeId: 'f4828793-28c2-465b-b783-0c697e41dafb' });
  };

  const stageIdChosenIndex = useMemo(
    () => updatedStages.findIndex((stage) => stage.id === stageIdChosen),
    [stageIdChosen, updatedStages]
  );
  const currentStageIndex = useMemo(
    () => updatedStages.findIndex((stage) => stage.id === currentStage),
    [currentStage, updatedStages]
  );

  const isLastStage = stageIdChosenIndex === updatedStages.length - 1;
  const isCompletedStageClick = stageIdChosenIndex < currentStageIndex;

  if (!recordId) return null;

  const ActionButton = () => {
    if (isLastStage) {
      return (
        <Button intent='primary' className='py-0' onClick={handleSelectStatus}>
          <Icon name='check' />
          <span className='text-xs'>{lastStage.title}</span>
        </Button>
      );
    }

    if (isCompletedStageClick) {
      return (
        <Button intent='primary' className='py-0' onClick={handleMarkStatusAsCurrent}>
          <Icon name='check' />
          <span className='text-xs'>Marks as Current Status</span>
        </Button>
      );
    }

    return (
      <Button intent='primary' className='py-0' onClick={handleMarkStatusAsComplete}>
        <Icon name='check' />
        <span className='text-xs'>Mark Status as Complete</span>
      </Button>
    );
  };

  return (
    <>
      <Stages
        currentStage={currentStage}
        stages={updatedStages}
        stageIdChosen={stageIdChosen}
        setStageIdChosen={setStageIdChosen}
      />
      <div className='mt-4 flex items-center justify-between text-[13px]'>
        <h3>Status: {updatedStages.find((stage) => stage.id === currentStage)?.name}</h3>
        <ActionButton />
      </div>
    </>
  );
};
export default StageSection;
