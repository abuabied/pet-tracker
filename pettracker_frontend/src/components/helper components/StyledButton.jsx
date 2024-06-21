import ButtonBase from "@mui/material/ButtonBase";

export const StyledButton = ({
  buttonText,
  onClick,
  disabled,
  textTransform = "uppercase",
  red=false
}) => {
  const baseStyle = {
    border: "1px solid #000000",
    display: "flex",
    gap: "10px",
    width: "206px",
    height: "48px",
    textTransform: textTransform,
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "20px",
    textAlign: "center",
    letterSpacing: "2.7px",
    maxWidth: "100%",
  };

  const regularMode = {
    background: "#00ff0010",
    color: "black",
    cursor: "pointer",
  };

  const redMode = {
    background: "#fcabab43",
    color: "black",
    cursor: "pointer",
  };

  const disabledMode = {
    background: "#d1d1d1",
    color: "#000000",
    cursor: "not-allowed",
  };
  const buttonStyle = red ? redMode : (disabled ? disabledMode : regularMode);

  return (
    <ButtonBase
      disabled={disabled}
      sx={{ ...baseStyle, ...buttonStyle }}
      onClick={onClick}
    >
      {buttonText}
    </ButtonBase>
  );
};
