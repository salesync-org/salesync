import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
// import { Stage as StageType } from '@/type';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Icon } from '../ui';
import { useToast } from '../ui/Toast';
import Stages from './Stages';

interface StageSectionProps {
  stages: StageType[];
  recordId: string;
  currentStage: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  updateRecord: (handleUpdate: Function) => unknown;
}

const lastStages = {
  lead: {
    id: '5',
    name: 'Converted',
    title: 'Select Convert Status',
    modalName: MODAL_TYPES.CONVERT_MODAL
  }
};

const StageSection = ({ stages, currentStage, updateRecord }: StageSectionProps) => {
  const [stageIdChosen, setStageIdChosen] = useState(currentStage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStageIdChosen(currentStage);
  }, [currentStage]);

  const { toast } = useToast();
  const { recordId = '' } = useParams();
  const queryClient = useQueryClient();
  const { showModal } = useGlobalModalContext();
  const { companyName = '' } = useParams();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (oldRecord: any) => {
    const updatedRecord = { ...oldRecord, current_stage_id: stageIdChosen };

    return updatedRecord;
  };
  const handleUpdateStage = async (recordId: string, stageId: string) => {
    const res = await updateRecord(handleUpdate);

    if (res) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['record', recordId], (data: any) => {
        return {
          ...data,
          source_record: {
            ...data.source_record,
            current_stage_id: stageId
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
      setLoading(true);
      await handleUpdateStage(recordId, stageIdChosen);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while marking status as current',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkStatusAsComplete = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStatus = () => {
    showModal(lastStage.modalName, { recordId, companyName });
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
    if (loading) {
      return (
        <Button intent='primary' disabled={loading} className='py-0'>
          <Icon name='check' />
          <span className='text-xs'>Setting stage...</span>
        </Button>
      );
    }

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
        isLoading={loading}
        currentStage={currentStage}
        stages={updatedStages}
        stageIdChosen={stageIdChosen}
        setStageIdChosen={setStageIdChosen}
      />
      <div className='mt-4 flex items-center justify-between'>
        <h3 className='text-base'>Status: {updatedStages.find((stage) => stage.id === currentStage)?.name}</h3>
        <ActionButton />
      </div>
    </>
  );
};
export default StageSection;
