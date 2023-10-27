interface AuthButtonProps {
  title: string;
  onClick?: () => void;
}

export const AuthButton = ({ title, onClick, ...rest }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      className={
        "w-full h-68 px-4 py-2 border-solid border-gray-200 border-2 rounded-xl text-white text-xl bg-gray-700 hover:bg-gray-600 shadow-sm"
      }
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  );
};
