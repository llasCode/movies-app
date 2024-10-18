import { useNavigate } from "react-router-dom";
import "./styles.css";

const Card = ({ title, poster, id }) => {
  const navigate = useNavigate();
  return (
    <>
      {poster && (
        <div
          className="card-container"
          onClick={() => navigate(`/movies/${id}`, { replace: true })}
        >
          <img className="card-img" src={poster} alt={title} />
          <p className="card-detail">{title}</p>
        </div>
      )}
    </>
  );
};

export default Card;
