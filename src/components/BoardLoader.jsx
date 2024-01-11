const SkeletonCard = () => {
  return (
    <div className="w-[300px] min-h-screen mx-auto bg-white p-4 rounded-md shadow-md my-4 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <div className="shadow p-2 border mb-8">
            <div className="h-4 bg-gray-200 mb-2 rounded"></div>
            <div className="h-6 bg-gray-300 mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 mb-2 rounded"></div>
            <div className="h-6 bg-gray-300 mb-4 rounded"></div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 flex-1 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BoardLoader = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default BoardLoader;
