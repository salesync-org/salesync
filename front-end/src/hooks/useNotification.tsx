import { NotificationContext } from '@/context/NotificationContext';
import { useContext } from 'react';

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
export default useNotification;
