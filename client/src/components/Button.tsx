interface ButtonProps {
  title: string;
  onClick: () => void;
}
function Button({ title, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} role="button">
      {title}
    </button>
  );
}

export default Button;
