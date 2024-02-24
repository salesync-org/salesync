import salesyncLogo from '../../assets/salesync_logo.png';
import salesyncLogoDark from '../../assets/salesync_logo_dark.png';
import Switch from '../../components/Switch/Switch';
import ComponentPanel from './ComponentPanel/ComponentPanel';
import TypographyPanel from './TypographyPanel/TypographyPanel';
import themeSwitcher from '../../utils/themeSwitcher';
import Icon from '../../components/Icon/Icon';
import PalettePanel from './PalettePanel/PalettePanel';
import ReactRouterDomPanel from './ReactRouterDomPanel/ReactRouterDomPanel';
import ModalPanel from './ModalPanel/ModalPanel';

function Cheatsheet() {
    return (
        <div className="px-10 mx-auto">
            <div className="my-16">
                <div className="dark:hidden visible mx-auto max-w-96">
                    <img src={salesyncLogo} alt="logo" />
                </div>
                <div className="dark:flex hidden mx-auto max-w-96">
                    <img src={salesyncLogoDark} alt="logo" />
                </div>
                <h1 className="flex justify-center">UI Cheatsheet</h1>
                <div className="mx-auto flex justify-center my-4 space-x-2 align-middle">
                    <Icon name="light_mode" size="1rem" />
                    <Switch
                        checked={document.documentElement.classList.contains('dark')}
                        onClick={themeSwitcher}
                    ></Switch>
                    <Icon name="dark_mode" size="1rem" />
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
