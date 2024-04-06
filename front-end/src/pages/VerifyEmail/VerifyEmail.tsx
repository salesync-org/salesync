import auth from '@/api/auth';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { companyName } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const accessToken = searchParams.get('key');
        if (!accessToken || !companyName) {
          throw new Error('Invalid verification link');
        }
        const res = await auth.verifyEmail(companyName || '', accessToken);

        if (res) {
          toast({
            title: 'Success',
            description: 'Email verified successfully',
            duration: 2000
          });

          navigate(`/${companyName}/change-password`);
          localStorage.setItem('access_token', accessToken);
        }
      } catch (error) {
        let message = 'Verification failed. Please try again.';

        if (error instanceof Error) {
          message = error.message;
        }

        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
          duration: 2000
        });
        return;
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [companyName, searchParams, toast, navigate]);

  return <div className='h-dvh w-full'>{loading && <LoadingSpinner />}</div>;
};
export default VerifyEmail;
