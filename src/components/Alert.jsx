import { useAppContext } from '../context/AppContext';

export const Alert = () => {
  const { alert } = useAppContext();
  
  if (!alert || !alert.show) return null;

  const typeStyles = {
    success: "bg-emerald-600 border-emerald-400",
    error: "bg-red-600 border-red-400",
    info: "bg-[#1E3A8A] border-blue-400", 
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl text-white shadow-2xl z-[9999] 
                 flex items-center gap-3 border animate-in fade-in slide-in-from-bottom-4 duration-300
                 ${typeStyles[alert.type] || typeStyles.info}`}
    >
      {/* Dynamic Icon based on type */}
      {alert.type === 'success' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
      
      {alert.type === 'error' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}

      {alert.type === 'info' && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )}

      <span className="font-semibold text-sm font-inter">
        {alert.message}
      </span>
    </div>
  );
};