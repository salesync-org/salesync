import notFoundLight from 'assets/system/notfound_light.png';
import notFoundDark from 'assets/system/notfound_dark.png';
const NotFoundImage = () => {
  return (
    <div className='h-full w-full'>
      <div className='flex h-full w-full justify-center'>
        <img className='h-56 w-56 dark:hidden' src={notFoundLight}></img>
        <img className='hidden h-56 w-56 dark:block' src={notFoundDark}></img>
      </div>
      <p className='-my-4 w-full text-center opacity-50'>Nothing Here</p>
    </div>
  );
};

export default NotFoundImage;
