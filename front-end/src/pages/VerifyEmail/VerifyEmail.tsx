import auth from '@/api/auth';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';
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
        localStorage.setItem('access_token', accessToken);
        const res = await auth.verifyEmail();

        if (res) {
          toast({
            title: 'Success',
            description: 'Email verified successfully',
            duration: 2000
          });

          localStorage.setItem('access_token', res.access_token);
          navigate(`/${companyName}/${res.user_id}/change-password`);
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
