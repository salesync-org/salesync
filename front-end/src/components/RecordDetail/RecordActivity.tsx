import { Button, Icon, Switch, PrimaryButton } from '@/components/ui';
import { useState } from 'react';
import ButtonActivity from './ButtonActivity';
import SettingActivity from './SettingActivity';

const RecordActivity = () => {
  const [expand, setExpand] = useState(false);
  const [expand2, setExpand2] = useState(false);
  // expand: upcoming and overdue
  // expand2: this month
  const [expandEmail, setExpandEmail] = useState(false);
  const [expandEvent, setExpandEvent] = useState(false);
  const [expandCall, setExpandCall] = useState(false);
  const [expandTask, setExpandTask] = useState(false);

  const [showActivity, setShowActivity] = useState(true);

  const [filter, setFilter] = useState(
    'Filters: Within 2 months • All activities • List email, Email, Logged calls, Events, and Tasks'
  );

  return (
    <div>
      <div className='flex flex-wrap'>
        <ButtonActivity name='Email' icon='mail' color='bg-neutral-400' />
        <ButtonActivity name='New Event' icon='calendar_month' color='bg-purple-400' />
        <ButtonActivity name='Log a Call' icon='call_log' color='bg-teal-600' />
        <ButtonActivity name='New Task' icon='checklist' color='bg-green-400' />
      </div>

      <div className='bg z-[10] my-4 flex w-fit rounded px-3'>
        <Icon name='face_2' className='mr-2 text-blue-500 dark:text-link-text-dark'></Icon>
        <span>Only show activities with insights</span>
        <Switch onClick={() => setShowActivity(!showActivity)} checked={false} className='z-10 ml-2'></Switch>
      </div>

      <div className='flex items-center'>
        <span>{filter}</span>
        <SettingActivity onchangeFilter={setFilter} />
      </div>

      <div className='flex flex-row-reverse'>
        <button className='text-blue-500 hover:text-blue-800'>Expand All</button>
        <span className='m-2'> • </span>
        <button className='text-blue-500 hover:text-blue-800'>Refresh</button>
      </div>

      <div>
        <Button
          className='my-2 flex w-full justify-start'
          onClick={() => setExpand(!expand)}
          title='Upcoming & Overdue'
        >
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
            <Button
              className='my-2 flex w-full justify-between'
              onClick={() => setExpand2(!expand2)}
              title='March • 2024'
            >
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

      <PrimaryButton className='mx-auto mb-12 mt-4' onClick={() => {}}>
        <span>Show All Activities</span>
      </PrimaryButton>
    </div>
  );
};

export default RecordActivity;
