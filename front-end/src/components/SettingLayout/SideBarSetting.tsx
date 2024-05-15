import { useParams } from 'react-router-dom';
import { Panel } from '../ui';
import { SettingDropDown } from './SettingDropDown';
import { ItemSetting } from './ItemSetting';

type SidebarSettingProps = {
  settings: SettingLayout[];
  adminPermission: boolean;
};

export const SidebarSetting = ({ settings, adminPermission }: SidebarSettingProps) => {
  const { companyName = '' } = useParams();
  return (
    <Panel className='m-0 h-full w-[284px] bg-panel px-0 py-4 dark:bg-panel-dark'>
      <div className='flex flex-col'>
        {settings.map((setting: SettingLayout) => {
          return (
            <div key={setting.name}>
              <div className='flex flex-col'>
                {setting.items ? (
                  <SettingDropDown title={setting.name} items={setting.items} adminPermission={adminPermission} />
                ) : (
                  <ItemSetting
                    name={setting.name}
                    href={`/${companyName}/${setting.path}`}
                    lock={!(!setting.adminSettingRole || adminPermission)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
