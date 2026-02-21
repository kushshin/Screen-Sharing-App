interface ButtonDetails {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonDetails) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg font-medium transition 
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
    >
      {children}
    </button>
  );
};

export default Button;