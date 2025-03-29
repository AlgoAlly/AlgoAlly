import React from 'react';

const RectangleSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-2.5">
      <div className="flex w-full items-center space-x-2">
        <div className="bg-bg-active h-6 w-12 rounded-full"></div>
      </div>
    </div>
  );
};
export default RectangleSkeleton;
