import "./styles.css";
import image from "./error.png";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-wrapper">
      <p className="error-message">{message}</p>
      <img className="error-image" alt="error" src={image} />
    </div>
  );
};

export default ErrorMessage;
