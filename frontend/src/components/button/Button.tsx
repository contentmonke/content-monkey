import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  width?: string;  // Optional width prop
}

const Button: React.FC<ButtonProps> = ({ onClick, label, width }) => {
  return (
    <button 
      className="button" 
      onClick={onClick} 
      style={{ "--button-width": width } as React.CSSProperties}
    >
      {label}
    </button>
  );
};

export default Button;
