const SkeletonCard = () => {
    return (
        <div className="bg-gray-800 rounded-xl p-4 animate-pulse mt-5">
            <div className="bg-gray-700 h-64 rounded-lg mb-4 p-4"></div>
            <div className="bg-gray-700 h-5 rounded-lg mb-4 p-4"></div>
            <div className="bg-gray-700 h-5 rounded-lg mb-4 p-4"></div>
        </div>
    )
};

export default SkeletonCard;