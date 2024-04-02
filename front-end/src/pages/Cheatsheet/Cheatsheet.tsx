import ComponentPanel from './ComponentPanel/ComponentPanel';
import TypographyPanel from './TypographyPanel/TypographyPanel';
import PalettePanel from './PalettePanel/PalettePanel';
import { Header } from '@/components/Header';

function Cheatsheet() {
  return (
    <>
      <div className='fixed w-full h-full bg-white/80 dark:bg-transparent backdrop-blur-lg -z-50'></div>
      <Header className='left-0 w-full'></Header>
      <div className='mx-auto px-10 pt-16'>
        <TypographyPanel />
        <ComponentPanel />
        <PalettePanel />
      </div>
    </>
  );
}
export default Cheatsheet;
