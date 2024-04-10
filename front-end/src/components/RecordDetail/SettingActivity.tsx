import React, { useState, useRef, useEffect } from 'react';
import { Button, Icon, PrimaryButton, RadioGroupInput, Checkbox, ErrorText } from '@/components/ui';
import { cn } from '@/utils/utils';
import useClickOutside from '@/hooks/useClickOutside';

interface SettingActivityProps {
  onchangeFilter: (value: string) => void;
}

const SettingActivity: React.FC<SettingActivityProps> = ({ onchangeFilter }) => {
  const [intent, setIntent] = useState('normal');
  const [isOpen, setIsOpen] = useState(false);
  const [dataRangeResult, setDataRangeResult] = useState('Within 2 months');
  const [activityToShowResult, setActivityToShowResult] = useState('All activities');
  const [sortActivityResult, setSortActivityResult] = useState('Newest dates first');

  const dataRange = ['Within 2 months', 'Next 7 days', 'Last 7 days', 'Last 30 days', 'Last 6 months', 'All time'];
  const activityToShow = ['All activities', 'My activities'];
  const sortActivity = ['Oldest dates first', 'Newest dates first'];

  const [errorCheck, setErrorCheck] = useState(false);
  const [isApply, setIsApply] = useState(false);

  const [check0, setCheck0] = useState(true); // 'All types'
  const [check1, setCheck1] = useState(true); // 'List email'
  const [check2, setCheck2] = useState(true); // 'Email'
  const [check3, setCheck3] = useState(true); // 'Logged calls'
  const [check4, setCheck4] = useState(true); // 'Events'
  const [check5, setCheck5] = useState(true); // 'Tasks'
  const [check6, setCheck6] = useState(false); // 'Completed cadence tasks'
  const [iconCheck, setIconCheck] = useState('minus'); // 'minus' or 'check'

  const settingBoard = useRef<HTMLDivElement>(null);

  useClickOutside([settingBoard], () => {
    setIntent('normal');
    setIsOpen(false);
  });

  useEffect(() => {
    if (check0 && check1 && check2 && check3 && check4 && check5 && check6) setIconCheck('check');
    else setIconCheck('minus');
    if (!check1 && !check2 && !check3 && !check4 && !check5 && !check6) setCheck0(false);
    else setCheck0(true);
    if (!check0 && !check1 && !check2 && !check3 && !check4 && !check5 && !check6) setErrorCheck(true);
    else setErrorCheck(false);
    if (errorCheck === false) setIsApply(false);
  }, [check0, check1, check2, check3, check4, check5, check6, iconCheck, errorCheck]);

  const onchangeFilterString = () => {
    let str = '';
    if (check0 && check1 && check2 && check3 && check4 && check5 && check6) str = 'All types';
    else {
      let numberOfTypes =
        Number(check1) + Number(check2) + Number(check3) + Number(check4) + Number(check5) + Number(check6);
      if (numberOfTypes === 1) {
        if (check6) str += 'Completed cadence tasks';
        if (check5) str += 'Tasks';
        if (check4) str += 'Events';
        if (check3) str += 'Logged calls';
        if (check2) str += 'Email';
        if (check1) str += 'List email';
      } else {
        let useAnd = false;
        if (check6 && numberOfTypes > 0) {
          numberOfTypes--;
          if (useAnd === false) {
            str = ', and ' + 'Completed cadence tasks' + str;
            useAnd = true;
          } else {
            if (numberOfTypes > 0) str = ', ' + 'Completed cadence tasks' + str;
            else str = 'Completed cadence tasks' + str;
          }
        }
        if (check5 && numberOfTypes > 0) {
          numberOfTypes--;
          if (useAnd === false) {
            str = ', and ' + 'Tasks' + str;
            useAnd = true;
          } else {
            if (numberOfTypes > 0) str = ', ' + 'Tasks' + str;
            else str = 'Tasks' + str;
          }
        }
        if (check4 && numberOfTypes > 0) {
          numberOfTypes--;
          if (useAnd === false) {
            str = ', and ' + 'Events' + str;
            useAnd = true;
          } else {
            if (numberOfTypes > 0) str = ', ' + 'Events' + str;
            else str = 'Events' + str;
          }
        }
        if (check3 && numberOfTypes > 0) {
          numberOfTypes--;
          if (useAnd === false) {
            str = ', and ' + 'Logged calls' + str;
            useAnd = true;
          } else {
            if (numberOfTypes > 0) str = ', ' + 'Logged calls' + str;
            else str = 'Logged calls' + str;
          }
        }
        if (check2 && numberOfTypes > 0) {
          numberOfTypes--;
          if (useAnd === false) {
            str = ', and ' + 'Email' + str;
            useAnd = true;
          } else {
            if (numberOfTypes > 0) str = ', ' + 'Email' + str;
            else str = 'Email' + str;
          }
        }
        if (check1 && numberOfTypes > 0) {
          numberOfTypes--;
          if (useAnd === false) {
            str = ', and ' + 'List email' + str;
            useAnd = true;
          } else {
            if (numberOfTypes > 0) str = ', ' + 'List email' + str;
            else str = 'List email' + str;
          }
        }
      }
    }
    onchangeFilter('Filters: ' + dataRangeResult + ' • ' + activityToShowResult + ' • ' + str);
  };

  return (
    <div ref={settingBoard}>
      <Button
        className='ml-2 p-3'
        onClick={() => {
          if (intent === 'normal') {
            setIntent('primary');
            setIsOpen(true);
          } else {
            setIntent('normal');
            setIsOpen(false);
          }
        }}
        title='Timeline Settings'
        intent={intent}
      >
        <Icon name='settings'></Icon>
      </Button>

      {isOpen && (
        <div
          className={cn(
            'fixed bottom-5 right-10 flex h-fit w-[420px] flex-col rounded',
            'bg-white shadow-2xl shadow-button-background-dark/10 dark:bg-panel-dark',
            'border border-button-stroke dark:border-button-stroke-dark ',
            'z-[110]'
          )}
        >
          <div className='rounded px-7 pt-5'>
            <Button
              onClick={() => {
                setIntent('normal');
                setIsOpen(false);
              }}
              className='absolute right-0 top-0 m-0 border-0 border-panel p-2 dark:bg-panel-dark'
            >
              <Icon name='close'></Icon>
            </Button>

            <div className='mb-5'>
              <span> DATE RANGE </span>
              <RadioGroupInput
                labels={dataRange}
                value={dataRangeResult}
                onValueChange={setDataRangeResult}
                className='ml-3 mt-1 grid grid-cols-2'
                size='small'
              ></RadioGroupInput>
            </div>

            <div className='mb-5'>
              <span> ACTIVITIES TO SHOW </span>
              <RadioGroupInput
                labels={activityToShow}
                value={activityToShowResult}
                onValueChange={setActivityToShowResult}
                className='ml-3 mt-1 grid grid-cols-2'
                size='small'
              ></RadioGroupInput>
            </div>

            <div className='mb-5'>
              <span> ACTIVITY TYPE </span>
              {errorCheck && isApply && (
                <ErrorText className='ml-2' text='Select at least one activity type'></ErrorText>
              )}
              <div className='grid grid-cols-2'>
                <div>
                  <Checkbox
                    className={cn(iconCheck, 'mr-1.5')}
                    checked={check0}
                    onCheckedChange={() => {
                      if (check0 === false) {
                        setIconCheck('check');
                        setCheck0(true);
                        setCheck0(true);
                        setCheck1(true);
                        setCheck2(true);
                        setCheck3(true);
                        setCheck4(true);
                        setCheck5(true);
                        setCheck6(true);
                      } else {
                        setCheck0(false);
                        setCheck1(false);
                        setCheck2(false);
                        setCheck3(false);
                        setCheck4(false);
                        setCheck5(false);
                        setCheck6(false);
                      }
                    }}
                  ></Checkbox>
                  <span>All types</span>
                </div>
                <div>
                  <Checkbox
                    className='mr-1.5'
                    checked={check1}
                    onCheckedChange={() => {
                      setCheck1(!check1);
                    }}
                  ></Checkbox>
                  <span>List email</span>
                </div>
                <div>
                  <Checkbox
                    className='mr-1.5'
                    checked={check2}
                    onCheckedChange={() => {
                      setCheck2(!check2);
                    }}
                  ></Checkbox>
                  <span>Email</span>
                </div>
                <div>
                  <Checkbox
                    className='mr-1.5'
                    checked={check3}
                    onCheckedChange={() => {
                      setCheck3(!check3);
                    }}
                  ></Checkbox>
                  <span>Logged calls</span>
                </div>
                <div>
                  <Checkbox
                    className='mr-1.5'
                    checked={check4}
                    onCheckedChange={() => {
                      setCheck4(!check4);
                    }}
                  ></Checkbox>
                  <span>Events</span>
                </div>
                <div>
                  <Checkbox
                    className='mr-1.5'
                    checked={check5}
                    onCheckedChange={() => {
                      setCheck5(!check5);
                    }}
                  ></Checkbox>
                  <span>Tasks</span>
                </div>
                <div>
                  <Checkbox
                    className='mr-1.5'
                    checked={check6}
                    onCheckedChange={() => {
                      setCheck6(!check6);
                    }}
                  ></Checkbox>
                  <span>Completed cadence tasks</span>
                </div>
              </div>
            </div>

            <div className='mb-5'>
              <span> SORT UPCOMING & OVERDUE ACTIVITIES </span>
              <RadioGroupInput
                labels={sortActivity}
                value={sortActivityResult}
                onValueChange={setSortActivityResult}
                className='ml-3 mt-1'
                size='small'
              ></RadioGroupInput>
            </div>
          </div>

          <div className='flex w-full justify-between rounded border border-button-stroke bg-panel p-4 dark:bg-panel-dark'>
            <div>
              <Button onClick={() => {}} disabled>
                Restore Defaults
              </Button>
            </div>
            <div className='flex gap-3'>
              <Button
                onClick={() => {
                  setIsApply(true);
                  if (!errorCheck) onchangeFilterString();
                }}
              >
                Apply & Save
              </Button>
              <PrimaryButton
                onClick={() => {
                  setIsApply(true);
                  if (!errorCheck) onchangeFilterString();
                }}
              >
                Apply
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingActivity;
