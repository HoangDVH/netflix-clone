import { useNavigate } from "react-router-dom";

export const NavBarHome = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-32 py-5 flex items-center justify-between">
      <img
        src="\src\assets\images\Logonetflix.png"
        alt="logo"
        className="w-36 h-12 "
      />
      <button className="bg-red-600 text-white px-4 py-2 rounded-md font-bold" onClick={() => navigate('/login')}>
        Sign in
      </button>
    </div>
  );
};
