import React, { useState } from 'react';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';

import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Modal, { ModalFooter } from '@/components/ui/Modal/Modal';
import DropDown from '@/components/ui/DropDown/DropDown';
import Item from '@/components/ui/Item/Item';
import '@/constants/api';
import { SAMPLE_ACCESS_TOKEN } from '@/constants/api';
import typeApi from '@/api/typeApi';

const TypeManager = () => {
  console.log('first');
  const [isTypeModelOpen, setIsTypeModelOpen] = useState(false);

  // Save access token to localStorage (for testing purpose only)
  localStorage.setItem('access_token', SAMPLE_ACCESS_TOKEN);

  document.documentElement.classList.remove('dark');
  // TODO: phân trang theo perpage=10 total page từ back-end

  //create Type sample data

  const exampleType: Type = {
    id: '1',
    name: 'Example Type',
    description: 'This is an example type.',
    fields: [
      { id: '1', name: 'Field 1' },
      { id: '2', name: 'Field 2' }
    ],
    links: [
      { id: '1', label_name: 'Link 1', link_type: 'Link 1', to_type: 'Link 1' },
      { id: '2', label_name: 'Link 2', link_type: 'Link 2', to_type: 'Link 2' }
    ]
  };

  const handleCreateType = async () => {
    try {
      const res = await typeApi.createType({ type: exampleType });
      if (res) {
        console.log('Create Type successfully');
        console.log(res);
        return res.type;
      }
    } catch (error) {
      console.error('Create Type failed', error);
    }
  };

  const handleSubmit = () => {
    setIsTypeModelOpen(false);
    handleCreateType();
  };

  return (
    <div className='mx-auto px-10'>
      <Panel>
        <div className='flex w-full flex-col'>
          <button className='self-start'>
            <div className='flex flex-row items-center'>
              <Icon name='navigate_before' className='text-link-text' />
              <div className='text-link-text underline underline-offset-2'>Go back</div>
            </div>
          </button>

          <h1 className='my-2 text-4xl font-bold'>Type Manager</h1>
          <div className='flex flex-row justify-between'>
            <TextInput className='w-auto' value='' placeholder='Search for types' prefixIcon='search' />
            <PrimaryButton
              className='mx-8'
              onClick={() => {
                setIsTypeModelOpen(true);
              }}
              showHeader={true}
            >
              <Icon name='edit' />
              <p>Create</p>
            </PrimaryButton>
          </div>

          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xl font-bold   tracking-wider '>
                  Type name
                </th>
                <th scope='col' className='px-6 py-3 text-center text-xl font-bold   tracking-wider '>
                  No. Fields
                </th>
                <th scope='col' className='px-6 py-3 text-center text-xl font-bold   tracking-wider '>
                  No. Links
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              <tr className='hover:bg-slate-100'>
                <td className='whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500'>Data 1</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>Data 2</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>Data 3</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>
                  <button>
                    <Icon name='navigate_next' />
                  </button>
                </td>
              </tr>

              <tr className='hover:bg-slate-100'>
                <td className='whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500'>Data 1</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>Data 2</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>Data 3</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>
                  <button>
                    <Icon name='navigate_next' />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      <Modal isOpen={isTypeModelOpen} onOpenChange={setIsTypeModelOpen} title='Create new Type'>
        <form>
          <div className='grid grid-cols-5 place-content-center gap-3'>
            <div className='col-span-3 flex flex-col gap-2'>
              <TextInput header='Type Name' className='w-full' value='' placeholder='Search for something' />
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              <DropDown header='Template' value='Select a value'>
                <Item title='Item 1' />
                <Item title='Item 2' />
                <Item title='Item 3' />
                <Item title='Item 4' />
              </DropDown>
            </div>
          </div>
          <ModalFooter className='mt-8'>
            <Button onClick={() => setIsTypeModelOpen(false)}>Cancel</Button>
            <PrimaryButton onClick={() => handleSubmit()}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default TypeManager;
