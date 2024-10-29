import PropTypes from "prop-types";

const Button = ({ text, onClick, variant = "primary" }) => (
  <button className={`button ${variant}`} onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default Button;
