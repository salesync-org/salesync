import salesyncLogo from '../../assets/salesync_logo.png';
import salesyncLogoDark from '../../assets/salesync_logo_dark.png';
import ToggleButton from '../../components/Button/ToggleButton';
import ComponentPanel from './ComponentPanel/ComponentPanel';
import TypographyPanel from './TypographyPanel/TypographyPanel';
import themeSwitcher from '../../utils/themeSwitcher';
import Icon from '../../components/Icon/Icon';
import PalettePanel from './PalettePanel/PalettePanel';
import ReactRouterDomPanel from './ReactRouterDomPanel/ReactRouterDomPanel';
import ModalPanel from './ModalPanel/ModalPanel';

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
        <div className='mx-auto my-4 flex justify-center space-x-2 align-middle'>
          <Icon name='light_mode' size='1rem' />
          <ToggleButton
            checked={document.documentElement.classList.contains('dark')}
            onClick={themeSwitcher}
          ></ToggleButton>
          <Icon name='dark_mode' size='1rem' />
        </div>
      </div>
      <TypographyPanel />
      <ComponentPanel />
      <PalettePanel />
      <ReactRouterDomPanel />
      <ModalPanel />
    </div>
  );
}
export default Cheatsheet;
