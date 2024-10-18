import "./styles.css";

const CardSkeleton = () => {
  return (
    <div className="skeleton">
      <div className="image-placeholder"></div>
      <div className="text-placeholder-wrapper">
        <div className="text-placeholder line"></div>
        <div className="text-placeholder line"></div>
        <div className="text-placeholder line"></div>
        <div className="text-placeholder line"></div>
        <div className="text-placeholder line"></div>
        <div className="text-placeholder line"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
