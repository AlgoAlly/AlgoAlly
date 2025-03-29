const CircleSkeleton: React.FC = () => {
  return (
    <div className="max-w-lg animate-pulse space-y-2.5">
      <div className="flex w-full items-center space-x-2">
        <div className="bg-bg-active h-6 w-6 rounded-full"></div>
      </div>
    </div>
  );
};
export default CircleSkeleton;
