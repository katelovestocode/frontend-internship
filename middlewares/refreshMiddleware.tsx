import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { isRefreshError } from "../redux/slices/authSlice";

const refreshMiddleware: Middleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    if (action?.payload?.status === 401) {
      store.dispatch(isRefreshError(true));
    }
    return next(action);
  };

export default refreshMiddleware;
