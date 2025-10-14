import { useState, useCallback } from 'react';

interface Notification {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const useNotification = () => {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: '',
    type: 'info',
  });

  const showNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    setNotification({
      open: true,
      message,
      type,
    });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      open: false,
    }));
  }, []);

  return {
    notification,
    showNotification,
    closeNotification,
  };
};