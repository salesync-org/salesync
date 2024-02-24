import Button from '@/components/ui/Button/Button';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import { sendRequest } from './LogInNavigate';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/cheatsheet`; 
    navigate(path);
  };

  return (
    <div className='mx-auto px-10 pt-20'>
      <h1 style={{fontSize: "5rem"}} className='my-20'>Log In Stimulation</h1>
      <p className='max-w-3xl'>
        The log in page will be handled by Keycloak later. To stimulate logging in with sample data, choose one between
        the options below.
      </p>
      <div className='flex items-center space-x-4 w-fit'>
        <PrimaryButton className='my-4' showHeader={false} onClick={() => {sendRequest('admin', 'admin'); routeChange();}}>
          <Icon name='check_circle'></Icon>
          <div>Log In</div>
        </PrimaryButton>
        <Button onClick={() => {sendRequest('notadmin', 'admin'); routeChange();}} showHeader={false}>
          <Icon name='cancel'></Icon>
          <div>Continue as Guest</div>
        </Button>
      </div>
    </div>
  );
}
export default LogIn;
