import Button from '@/components/ui/Button/Button';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Icon from '@/components/ui/Icon/Icon';
import useAuth from '@/hooks/useAuth';

function LogIn() {
  const { login } = useAuth();
  return (
    <div className='mx-auto px-10 pt-20'>
      <h1 style={{ fontSize: '5rem', lineHeight: '5rem' }} className='my-20'>
        Log In Stimulation
      </h1>
      <p className='max-w-3xl'>
        The log in page will be handled by Keycloak later. To stimulate logging in with sample data, choose one between
        the options below.
      </p>
      <div className='flex w-fit items-center space-x-4'>
        <PrimaryButton
          type='submit'
          className='my-4'
          showHeader={false}
          onClick={() => {
            login({ email: 'admin', password: 'admin' });
          }}
        >
          <Icon name='check_circle'></Icon>
          <div>Log In</div>
        </PrimaryButton>
        <Button
          onClick={() => {
            login({ email: 'notadmin', password: 'admin' });
          }}
          showHeader={false}
        >
          <Icon name='cancel'></Icon>
          <div>Continue as Guest</div>
        </Button>
      </div>
    </div>
  );
}
export default LogIn;
