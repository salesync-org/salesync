import SettingRow from '@/components/Setting/SettingRow';
import SettingSection from '@/components/Setting/SettingSection';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';

const settings = [
  {
    icon: 'desktop_windows',
    title: 'User Interface',
    description: 'Configure User Interface (Theme, Pagination)',
    href: '#'
  },
  { icon: 'attach_money', title: 'Currency', description: 'Configure currency used', href: '#' },
  { icon: 'notifications', title: 'Notifications', description: 'Notification', href: '#' },
  { icon: 'language', title: 'Languages', description: 'The language being used in the app', href: '#' }
];

const administrations = [
  {
    icon: 'contact_page',
    title: 'Type Manager',
    description: 'Configure fields, relations of all record types',
    href: '/type-manager'
  },
  { icon: 'account_circle', title: 'User', description: 'Manage and control all user accounts', href: '#' },
  { icon: 'vpn_key', title: 'Role', description: 'Configure roles and permissions', href: '#' }
];

const Setting = () => {
  return (
    <Panel>
      <main className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold leading-8'>Settings & Administration</h1>
        <TextInput prefixIcon='search' placeholder='Search for settings' />
        <SettingSection title='Settings'>
          {settings.map((setting) => (
            <SettingRow key={setting.title} {...setting} />
          ))}
        </SettingSection>
        <SettingSection title='Administration'>
          {administrations.map((administration) => (
            <SettingRow key={administration.title} {...administration} />
          ))}
        </SettingSection>
      </main>
    </Panel>
  );
};
export default Setting;
