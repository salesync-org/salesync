import stageApi from '@/api/stage';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/components/ui/StrictModeDroppable';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Button, PrimaryButton, TextInput } from '@/components/ui';

type StageSettingProps = {
  typeId: string;
};

const StageSetting = ({ typeId }: StageSettingProps) => {
  const { companyName } = useParams();
  const [visibleStages, setVisibleStages] = useState<Stage[]>([]);

  // Fetch initial stages
  useEffect(() => {
    const fetchData = async () => {
      const stages: Stage[] = await stageApi.getAllStages(companyName ?? '', typeId);
      setVisibleStages(stages);
    };

    fetchData();
  }, [companyName, typeId]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(visibleStages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setVisibleStages(items);
  }

  return (
    <div className='py-2'>
      <div className='my-4 flex h-fit flex-row justify-between'>
        <div className='flex-grow'>
          <TextInput
            // onChange={(e) => setSearch(e.target.value)}
            className='w-full'
            // value={search}
            placeholder='Add Stage'
          />
        </div>
        <PrimaryButton
          className='ml-2 h-[34px] space-x-2'
          onClick={() => {
            // setIsTypeModelOpen(true);
          }}
          showHeader={true}
        >
          <Pencil size='1rem' />
          <p>Add</p>
        </PrimaryButton>
      </div>
      <header className=''>
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
                                <div className='flex items-center justify-center space-x-4'>
                                  <GripVertical size='1rem' className='flex-shrink-0 opacity-40' />
                                  <div> {stage.name} </div>
                                </div>
                                <Button rounded className='h-10 w-10 rounded-full border-0 p-0'>
                                  <Trash2 size={'1rem'}></Trash2>
                                </Button>
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
      </header>
    </div>
  );
};

export default StageSetting;
