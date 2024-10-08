const NotificationBadge = ({ count }: { count: number }) => {
    if (count === undefined || count === 0) {
        return (
          <span
            className="absolute top-0 right-0 z-50 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-gray-600 bg-red-200 rounded-full"
            style={{ transform: 'translate(50%, -50%)' }}
          >
            Null
          </span>
        );
      }
  
    return (
        <span
            className="absolute top-0 right-0 z-50 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-gray-600 bg-red-200 rounded-full"
            style={{ transform: 'translate(50%, -50%)' }}
          >
          {count}
        </span>
      
    );
  };
  
  export default NotificationBadge;