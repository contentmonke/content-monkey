import { string } from "three/webgpu";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  width?: string;  // Optional width prop
  color?: string;
  hovercolor?: string;
  textcolor?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, width, color, hovercolor, textcolor }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={{ "--button-width": width, "--button-color": color, "--button-hovercolor": hovercolor, "--button-textcolor": textcolor } as React.CSSProperties}
    >
      {label}
    </button>
  );
};

export default Button;
