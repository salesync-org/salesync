import React, { useState } from 'react';
import Panel from '../../components/Panel/Panel';
import TextInput from '../../components/TextInput/TextInput';
import { MdArrowBackIos, MdNavigateNext } from 'react-icons/md';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Modal, { ModalFooter } from '../../components/ui/modal/Modal';
import DropDown from '../../components/DropDown/DropDown';
import Item from '../../components/Item/Item';

const TypeManager = () => {
  const [isTypeModelOpen, setIsTypeModelOpen] = useState(false);

  document.documentElement.classList.remove('dark');
  // TODO: phân trang theo perpage=10 total page từ back-end

  return (
    <div className='mx-auto px-10'>
      <Panel>
        <div className='flex w-full flex-col'>
          <button className='self-start'>
            <div className='flex flex-row items-center'>
              <MdArrowBackIos className='text-blue-800' />
              <div className='text-blue-800 underline underline-offset-2'>Go back</div>
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
                    <MdNavigateNext />
                  </button>
                </td>
              </tr>

              <tr className='hover:bg-slate-100'>
                <td className='whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500'>Data 1</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>Data 2</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>Data 3</td>
                <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>
                  <button>
                    <MdNavigateNext />
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
            <PrimaryButton onClick={() => setIsTypeModelOpen(false)}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default TypeManager;
