import stageApi from '@/api/stage';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/components/ui/StrictModeDroppable';
import { Check, GripVertical, Pencil, Trash2, X, Plus } from 'lucide-react';
import { Button, PrimaryButton, TextInput } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';

type StageSettingProps = {
  typeId: string;
};

const StageSetting = ({ typeId }: StageSettingProps) => {
  const { companyName } = useParams();
  const [visibleStages, setVisibleStages] = useState<Stage[]>([]);
  const [newStage, setNewStage] = useState<string>('');
  const [editStage, setEditStage] = useState<Stage | null>(null);
  const { toast } = useToast();

  // Fetch initial stages
  useEffect(() => {
    const fetchData = async () => {
      const stages: Stage[] = await stageApi.getAllStages(companyName ?? '', typeId);
      setVisibleStages(stages);
    };

    fetchData();
  }, [companyName, typeId]);

  const handleOnDeleteStage = async (stageId: string) => {
    try {
      await stageApi.deleteStage(companyName ?? '', stageId);
      const stages = visibleStages.filter((stage) => stage.id !== stageId);
      toast({
        title: 'Success',
        description: 'Stage deleted successfully.'
      });
      setVisibleStages(stages);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Cannot delete the first or last stage.',
        variant: 'destructive'
      });
    }
  };

  const handleCreateStage = async () => {
    const stageRequest: Stage = {
      id: '',
      name: newStage,
      sequenceNumber: visibleStages.length + 1,
      type: visibleStages[0].type ?? undefined
    };
    setNewStage('');
    const stageResponse = await stageApi.createStage(companyName ?? '', stageRequest);
    console.log(stageResponse);
    setVisibleStages([...visibleStages, stageResponse]);
  };

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleUpdateStage = debounce(async (stage: Stage) => {
    await stageApi.updateStage(companyName ?? '', stage);
  }, 500);

  const handleUpdateSequence = debounce(async (stage: Stage[]) => {
    await stageApi.updateSequenceNumber(companyName ?? '', typeId, stage);
  }, 500);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(visibleStages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setVisibleStages(items);
    handleUpdateSequence(items);
  }

  console.log(visibleStages);

  return (
    <div className='h-full py-2 '>
      <div className='my-4 flex h-fit flex-row justify-between'>
        <div className='flex-grow'>
          <TextInput
            // onChange={(e) => setSearch(e.target.value)}
            className='w-full'
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
            placeholder='Add Stage'
          />
        </div>
        <PrimaryButton
          className='ml-2 h-[34px] space-x-2'
          onClick={() => {
            handleCreateStage();
          }}
          showHeader={true}
        >
          <Plus size='1rem' />
          <p>Add</p>
        </PrimaryButton>
      </div>
      <header className='h-full overflow-y-scroll'>
        {visibleStages.length >= 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <StrictModeDroppable droppableId='characters'>
              {(provided) => (
                <ul className='characters' {...provided.droppableProps} ref={provided.innerRef}>
                  {visibleStages &&
                    visibleStages.map((stage, index) => {
                      return (
                        <Draggable key={stage.id} draggableId={stage.id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className='py-2'>
                                <div
                                  className={cn(
                                    'h-12 w-full rounded-sm bg-button-background dark:bg-button-background-dark',
                                    'border-2 border-input-stroke-light dark:border-input-stroke-dark',
                                    'flex select-none items-center justify-between overflow-hidden pl-2 pr-4 hover:cursor-move'
                                  )}
                                >
                                  {editStage != null && editStage.id === stage.id ? (
                                    <div className='flex items-center justify-center space-x-4'>
                                      <TextInput
                                        value={editStage.name}
                                        onChange={(e) => {
                                          setEditStage({ ...editStage, name: e.target.value });
                                        }}
                                        autoFocus
                                      ></TextInput>
                                      <Button
                                        rounded
                                        className='h-10 w-10 rounded-full border-0 p-0'
                                        onClick={() => {
                                          setVisibleStages((prev) => {
                                            const newStages = prev.map((s) => {
                                              if (s.id === editStage.id) {
                                                return editStage;
                                              }
                                              return s;
                                            });
                                            return newStages;
                                          });
                                          handleUpdateStage(editStage);
                                          setEditStage(null);
                                        }}
                                      >
                                        <Check size={'1rem'}></Check>
                                      </Button>
                                      <Button
                                        rounded
                                        className='h-10 w-10 rounded-full border-0 p-0'
                                        onClick={() => {
                                          setEditStage(null);
                                        }}
                                      >
                                        <X size={'1rem'}></X>
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className='flex items-center justify-center space-x-4'>
                                      <GripVertical size='1rem' className='flex-shrink-0 opacity-40' />
                                      <div> {stage.name} </div>
                                      {index == visibleStages.length - 1 && (
                                        <div className='rounded-full  border-[1px] border-primary px-2 py-1 text-xs text-primary dark:border-secondary dark:text-secondary'>
                                          Convert
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  <div className='flex w-fit space-x-2'>
                                    <Button
                                      rounded
                                      className='h-10 w-10 rounded-full border-0 p-0'
                                      onClick={() => {
                                        setEditStage(stage);
                                      }}
                                    >
                                      <Pencil size={'1rem'}></Pencil>
                                    </Button>
                                    {index == visibleStages.length - 1 || index == 0 ? (
                                      <></>
                                    ) : (
                                      <Button
                                        rounded
                                        className='h-10 w-10 rounded-full border-0 p-0'
                                        onClick={() => {
                                          handleOnDeleteStage(stage.id);
                                        }}
                                      >
                                        <Trash2 size={'1rem'}></Trash2>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        ) : (
          <div className='flex h-full items-center justify-center'>
            <LoadingSpinner />
          </div>
        )}
      </header>
    </div>
  );
};

export default StageSetting;
