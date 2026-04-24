import React from 'react';

interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  visible: boolean;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  message, 
  type = 'info', 
  visible 
}) => {
  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'var(--success)';
      case 'warning': return 'var(--warning)';
      case 'error': return 'var(--danger)';
      case 'info':
      default: return 'var(--primary-pink)';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info':
      default: return 'ℹ️';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: getBackgroundColor(),
      color: 'white',
      padding: '15px 30px',
      borderRadius: '15px',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      minWidth: '250px',
      maxWidth: '80%',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <span style={{ marginRight: '10px' }}>{getIcon()}</span>
      {message}
    </div>
  );
};

export default ToastNotification;