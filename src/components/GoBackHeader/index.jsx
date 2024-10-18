import { useNavigate } from "react-router-dom";
import "./styles.css";

const GoBackHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
};

export default GoBackHeader;
