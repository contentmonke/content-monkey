import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  width?: string;  // Optional width prop
  color?: string;
  hovercolor?: string;
  textcolor?: string;
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, label, width, color, hovercolor, textcolor, disabled }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={{ "--button-width": width, "--button-color": color, "--button-hovercolor": hovercolor, "--button-textcolor": textcolor } as React.CSSProperties}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
