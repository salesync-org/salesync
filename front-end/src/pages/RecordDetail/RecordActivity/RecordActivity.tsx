import { Button, Icon, Switch, ButtonGroup, DropDownList, Item, PrimaryButton } from '@/components/ui';
import { useState } from 'react';

const RecordActivity = () => {
  const [isEmailOpen, setEmailOpen] = useState(false);
  const [isEventOpen, setEventOpen] = useState(false);
  const [isCallOpen, setCallOpen] = useState(false);
  const [isTaskOpen, setTaskOpen] = useState(false);

  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);
  // expand: upcoming and overdue
  // expand2: this month
  const [expandEmail, setExpandEmail] = useState(false);
  const [expandEvent, setExpandEvent] = useState(false);
  const [expandCall, setExpandCall] = useState(false);
  const [expandTask, setExpandTask] = useState(false);

  const [showActivity, setShowActivity] = useState(true);

  return (
    <>
      <div className='flex flex-wrap'>
        <ButtonGroup className='mb-1 mr-1'>
          <Button>
            <div className='flex items-center'>
              <Icon name='mail' className='mr-1 rounded bg-neutral-400 p-0.5 text-white'></Icon>
              <span className='text-blue-500'>Email</span>
            </div>
          </Button>
          <DropDownList
            open={isEmailOpen}
            onClose={() => {
              setEmailOpen(false);
            }}
          >
            <Item title='Delete' />
          </DropDownList>
          <Button zoom={false} intent='normal' className='px-1' onClick={() => setEmailOpen(true)}>
            <Icon name='arrow_drop_down' size='1'></Icon>
          </Button>
        </ButtonGroup>
        <ButtonGroup className='mb-1 mr-1'>
          <Button>
            <div className='flex items-center'>
              <Icon name='calendar_month' className='mr-1 rounded bg-purple-400 p-0.5 text-white'></Icon>
              <span className='text-blue-500'>New Event</span>
            </div>
          </Button>
          <DropDownList
            open={isEventOpen}
            onClose={() => {
              setEventOpen(false);
            }}
          >
            <Item title='Delete' />
          </DropDownList>
          <Button zoom={false} intent='normal' className='px-1' onClick={() => setEmailOpen(true)}>
            <Icon name='arrow_drop_down' size='1'></Icon>
          </Button>
        </ButtonGroup>
        <ButtonGroup className='mb-1 mr-1'>
          <Button>
            <div className='flex items-center'>
              <Icon name='call_log' className='mr-1 rounded bg-teal-600 p-0.5 text-white'></Icon>
              <span className='text-blue-500'>Log a Call</span>
            </div>
          </Button>
          <DropDownList
            open={isCallOpen}
            onClose={() => {
              setCallOpen(false);
            }}
          >
            <Item title='Delete' />
          </DropDownList>
          <Button zoom={false} intent='normal' className='px-1' onClick={() => setEmailOpen(true)}>
            <Icon name='arrow_drop_down' size='1'></Icon>
          </Button>
        </ButtonGroup>
        <ButtonGroup className='mb-1'>
          <Button>
            <div className='flex items-center'>
              <Icon name='checklist' className='mr-1 rounded bg-green-600 p-0.5 text-white'></Icon>
              <span className='text-blue-500'>New Task</span>
            </div>
          </Button>
          <DropDownList
            open={isTaskOpen}
            onClose={() => {
              setTaskOpen(false);
            }}
          >
            <Item title='Delete' />
          </DropDownList>
          <Button zoom={false} intent='normal' className='px-1' onClick={() => setEmailOpen(true)}>
            <Icon name='arrow_drop_down' size='1'></Icon>
          </Button>
        </ButtonGroup>
      </div>

      <div className='bg my-4 flex w-fit rounded px-3'>
        <Icon name='face_2' className='mr-2 text-blue-500'></Icon>
        <span>Only show activities with insights</span>
        <Switch onClick={() => setShowActivity(!showActivity)} checked={false} className='ml-2'></Switch>
      </div>
      <div className='flex items-center'>
        <span>Filters: Within 2 months • All activities • Logged calls, Email, Events, List email, and Tasks</span>
        <Button className='ml-2 p-3'>
          <Icon name='settings'></Icon>
        </Button>
      </div>
      <div className='flex flex-row-reverse'>
        <button>
          <span className='text-blue-500'>Expand All</span>
        </button>
        <span className='m-2'> • </span>
        <button>
          <span className='text-blue-500'>Refresh</span>
        </button>
      </div>

      <div>
        <Button className='my-2 flex w-full justify-start' onClick={() => setExpand(!expand)}>
          {expand && <Icon name='expand_more' size='1' />}
          {!expand && <Icon name='chevron_right' size='1' />}
          <span className='font-bold'>Upcoming & Overdue</span>
        </Button>
        {expand && (
          <>
            <div className='flex justify-center'>
              <span>No activities to show.</span>
            </div>
            <div className='flex justify-center'>
              <span>Get started by sending an email, scheduling a task, and more.</span>
            </div>
          </>
        )}
      </div>

      {showActivity && (
        <>
          <div>
            <Button className='my-2 flex w-full justify-between' onClick={() => setExpand2(!expand2)}>
              <div className='item-center flex'>
                {expand2 && <Icon name='expand_more' size='1' />}
                {!expand2 && <Icon name='chevron_right' size='1' />}
                <span className='font-bold'>March • 2024</span>
              </div>
              <span className='font-bold'>This Month</span>
            </Button>
            {expand2 && (
              <>
                {/* Email */}
                <div className='my-2'>
                  <div className='flex justify-between'>
                    <div className='flex w-16'>
                      <button onClick={() => setExpandEmail(!expandEmail)}>
                        {expandEmail && <Icon name='expand_more' size='1' />}
                        {!expandEmail && <Icon name='chevron_right' size='1' />}
                      </button>
                      <Icon name='mail' className='rounded bg-neutral-400 p-0.5 text-white'></Icon>
                    </div>
                    <div className='flex w-full justify-between pl-4'>
                      <a href='' className='text-blue-500'>
                        Email
                      </a>
                      <div className='flex'>
                        <span>7 th 3</span>
                        <Button className='ml-2 h-5 w-5'>
                          <Icon name='arrow_drop_down' size='1'></Icon>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='mt-1 table h-full w-full'>
                    <div className='relative table-cell w-16'>
                      <div className='absolute right-5 top-0 h-full w-1 bg-neutral-400'></div>
                    </div>
                    <div className='table-cell'>
                      <div className='px-2'>
                        <div className='px-2'>
                          <span>You sent an email</span>
                        </div>
                        {expandEmail && (
                          <div>
                            <div className='w-full rounded border border-zinc-200 px-2'>
                              <div>
                                <span>Description</span>
                              </div>
                              <div>
                                <span>abc</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event */}
                <div className='my-2'>
                  <div className='flex justify-between'>
                    <div className='flex w-16'>
                      <button onClick={() => setExpandEvent(!expandEvent)}>
                        {expandEvent && <Icon name='expand_more' size='1' />}
                        {!expandEvent && <Icon name='chevron_right' size='1' />}
                      </button>
                      <Icon name='calendar_month' className='rounded bg-purple-400 p-0.5 text-white'></Icon>
                    </div>
                    <div className='flex w-full justify-between pl-4'>
                      <a href='' className='text-blue-500'>
                        Event
                      </a>
                      <div className='flex'>
                        <span>7 th 3</span>
                        <Button className='ml-2 h-5 w-5'>
                          <Icon name='arrow_drop_down' size='1'></Icon>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='mt-1 table h-full w-full'>
                    <div className='relative table-cell w-16'>
                      <div className='absolute right-5 top-0 h-full w-1 bg-purple-400'></div>
                    </div>
                    <div className='table-cell'>
                      <div className='px-2'>
                        <div className='px-2'>
                          <span>You will have a meeting tomorrow</span>
                        </div>
                        {expandEvent && (
                          <div>
                            <div className='w-full rounded border border-zinc-200 px-2'>
                              <div>
                                <span>Description</span>
                              </div>
                              <div>
                                <span>abc</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call */}
                <div className='my-2'>
                  <div className='flex justify-between'>
                    <div className='flex w-16'>
                      <button onClick={() => setExpandCall(!expandCall)}>
                        {expandCall && <Icon name='expand_more' size='1' />}
                        {!expandCall && <Icon name='chevron_right' size='1' />}
                      </button>
                      <Icon name='call_log' className='rounded bg-teal-600 p-0.5 text-white'></Icon>
                    </div>
                    <div className='flex w-full justify-between pl-4'>
                      <a href='' className='text-blue-500'>
                        Call
                      </a>
                      <div className='flex'>
                        <span>7 th 3</span>
                        <Button className='ml-2 h-5 w-5'>
                          <Icon name='arrow_drop_down' size='1'></Icon>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='mt-1 table h-full w-full'>
                    <div className='relative table-cell w-16'>
                      <div className='absolute right-5 top-0 h-full w-1 bg-teal-600'></div>
                    </div>
                    <div className='table-cell'>
                      <div className='px-2'>
                        <div className='px-2'>
                          <span>You logged a call</span>
                        </div>
                        {expandCall && (
                          <div>
                            <div className='w-full rounded border border-zinc-200 px-2'>
                              <div>
                                <span>Description</span>
                              </div>
                              <div>
                                <span>abc</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task */}
                <div className='my-2'>
                  <div className='flex justify-between'>
                    <div className='flex w-16'>
                      <button onClick={() => setExpandTask(!expandTask)}>
                        {expandTask && <Icon name='expand_more' size='1' />}
                        {!expandTask && <Icon name='chevron_right' size='1' />}
                      </button>
                      <Icon name='checklist' className='rounded bg-green-600 p-0.5 text-white'></Icon>
                    </div>
                    <div className='flex w-full justify-between pl-4'>
                      <a href='' className='text-blue-500'>
                        Task
                      </a>
                      <div className='flex'>
                        <span>7 th 3</span>
                        <Button className='ml-2 h-5 w-5'>
                          <Icon name='arrow_drop_down' size='1'></Icon>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='mt-1 table h-full w-full'>
                    <div className='relative table-cell w-16'>
                      <div className='absolute right-5 top-0 h-full w-1 bg-green-600'></div>
                    </div>
                    <div className='table-cell'>
                      <div className='px-2'>
                        <div className='px-2'>
                          <span>you have a job to do</span>
                        </div>
                        {expandTask && (
                          <div>
                            <div className='w-full rounded border border-zinc-200 px-2'>
                              <div>
                                <span>Description</span>
                              </div>
                              <div>
                                <span>abc</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <Button className='flex w-full items-center justify-start' onClick={() => {}} disabled>
        <Icon name='info'></Icon>
        <div>
          <span>To change what's shown, try changing your filters.</span>
        </div>
      </Button>
      <PrimaryButton className='mt-4 mb-12 mx-auto' onClick={() => {}}>
        <span>Show All Activities</span>
      </PrimaryButton>
    </>
  );
};

export default RecordActivity;
