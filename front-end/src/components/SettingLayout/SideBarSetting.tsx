import { useParams } from 'react-router-dom';
import { Panel } from '../ui';
import { SettingDropDown } from './SettingDropDown';
import { ItemSetting } from './ItemSetting';
import { Setting } from '@/pages/Settings/SettingLayout';

type SidebarSettingProps = {
  settings: Setting[];
};

export const SidebarSetting = ({ settings }: SidebarSettingProps) => {
  const { companyName = '' } = useParams();
  return (
    <Panel className='m-0 h-full w-[284px] bg-white px-0 py-4'>
      <div className='flex flex-col'>
        {settings.map((setting: Setting) => {
          return (
            <div key={setting.name}>
              <div className='flex flex-col'>
                {setting.items ? (
                  <SettingDropDown title={setting.name} items={setting.items} />
                ) : (
                  <ItemSetting name={setting.name} href={`/${companyName}/${setting.path}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
