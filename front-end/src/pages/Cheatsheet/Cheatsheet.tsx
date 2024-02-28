import salesyncLogo from 'assets/salesync_logo.png';
import salesyncLogoDark from 'assets/salesync_logo_dark.png';
import Switch from 'ui/Switch/Switch';
import ComponentPanel from './ComponentPanel/ComponentPanel';
import TypographyPanel from './TypographyPanel/TypographyPanel';
import themeSwitcher from 'utils/themeSwitcher';
import Icon from 'ui/Icon/Icon';
import PalettePanel from './PalettePanel/PalettePanel';
import ReactRouterDomPanel from './ReactRouterDomPanel/ReactRouterDomPanel';

function Cheatsheet() {
  return (
    <div className='mx-auto px-10'>
      <div className='my-16'>
        <div className='visible mx-auto max-w-96 dark:hidden'>
          <img src={salesyncLogo} alt='logo' />
        </div>
        <div className='mx-auto hidden max-w-96 dark:flex'>
          <img src={salesyncLogoDark} alt='logo' />
        </div>
        <h1 className='flex justify-center'>UI Cheatsheet</h1>
      </div>
      <TypographyPanel />
      <ComponentPanel />
      <PalettePanel />
      <ReactRouterDomPanel />
    </div>
  );
}
export default Cheatsheet;
