import { logOut } from "@/redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();

  const handleLogout = () => {
    try {
      dispatch(logOut());
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("provider");
      logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return handleLogout;
};

export default useLogout;
