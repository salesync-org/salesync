import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorToaster = ({ errorTitle = 'Error', errorMessage = '' }: { errorTitle?: string; errorMessage?: string }) => {
  const { toast } = useToast();
  const retryTimeRef = useRef(0);
  const navigate = useNavigate();

  const retryAction = () => {
    retryTimeRef.current += 1;
    navigate(0);
  };

  const goHomeAction = () => {
    retryTimeRef.current = 0;
    navigate('/');
  };

  useEffect(() => {
    const showToast = () => {
      toast({
        variant: 'destructive',
        title: errorTitle,
        description: errorMessage,
        action:
          retryTimeRef.current < 3 ? (
            <ToastAction altText='Try again' onClick={retryAction}>
              Try again
            </ToastAction>
          ) : (
            <ToastAction altText='Go to Home' onClick={goHomeAction}>
              Go back to Home
            </ToastAction>
          )
      });
    };

    showToast();
  }, [errorTitle, errorMessage, toast]);

  return null;
};
export default ErrorToaster;
