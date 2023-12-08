import { Navigate, useRoutes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { WatchVideoPage } from "../pages/WatchVideoPage";
import { HomePage } from "../pages/HomePage";
import { MovieListPage } from "../pages/MovieListPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { Favorite } from "../components/Favorite";
import { AdminPage } from "../pages/AdminPage";
import { AdminUser } from "../components/Admin/AdminUser/AdminUser";
import { AdminRole } from "../components/Admin/AdminRole/AdminRole";
import { AdminPolicy } from "../components/Admin/AdminPolicy/AdminPolicy";
import { AdminPermission } from "../components/Admin/AdminPermission/AdminPermission";
import { AdminHome } from "../components/Admin/AdminHome";
import { AdminUserEdit } from "../components/Admin/AdminUser/AdminUserEdit";
import { AdminUserCreate } from "../components/Admin/AdminUser/AdminUserCreate";
import { AdminRoleCreate } from "../components/Admin/AdminRole/AdminRoleCreate";
import { AdminRoleView } from "../components/Admin/AdminRole/AdminRoleView";
import { AdminRoleEdit } from "../components/Admin/AdminRole/AdminRoleEdit";
import { AdminPolicyCreate } from "../components/Admin/AdminPolicy/AdminPolicyCreate";
import { AdminPolicyView } from "../components/Admin/AdminPolicy/AdminPolicyView";
import { AdminPolicyEdit } from "../components/Admin/AdminPolicy/AdminPolicyEdit";
import { AdminPermissionCreate } from "../components/Admin/AdminPermission/AdminPermissionCreate";
import { AdminPermissionView } from "../components/Admin/AdminPermission/AdminPermissionView";
import { AdminPermissionEdit } from "../components/Admin/AdminPermission/AdminPermissionEdit";
import { useGetCurrentUserQuery} from "../apis/accountUser";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";

import { LoadingSpiner } from "../components/LoadingSpiner";

const isAuthenticated = () => {
  const userString = localStorage.getItem("user");

  if (userString === null) {
    return false; // No user information found
  }
  const user = JSON.parse(userString);
  const accessToken = user ? user.accessToken : null;

  return accessToken !== null && accessToken !== undefined;
};

export default function useRouteElements() {
  const { accessToken } = useSelector(selectAuth);
  const { data: dataGetCurrentUser, isFetching } = useGetCurrentUserQuery({
    accessToken: accessToken || "",
  });
  if (isFetching) {
    return <LoadingSpiner />; // You can replace this with your loading indicator
  }

  const isAdmin = dataGetCurrentUser?.roles?.some(
    (role) => role.name === "Admin"
  );

  const routeElements = useRoutes([
    {
      path: "/loading",
      element: <LoadingSpiner />,
    },
    {
      path: "/browse",
      element: isAuthenticated() ? <MainPage /> : <Navigate to="/login" />,
    },
    {
      path: "/:movieId",
      element: <MainPage />,
    },
    {
      path: "/:movieId/watch",
      element: <WatchVideoPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/genre/:title",
      element: <MovieListPage />,
    },

    {
      path: "/login",
      element: isAuthenticated() ? (
        isAdmin ? (
          <Navigate to="/admin" />
        ) : (
          <Navigate to="/browse" />
        )
      ) : (
        <LoginPage />
      ),
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

    {
      path: "/search",
      element: <SearchResultPage />,
    },
    {
      path: "/favorite",
      element: <Favorite />,
    },
    {
      path: "/admin",
      element: isAuthenticated() ? (
        isAdmin ? (
          <AdminPage />
        ) : (
          <Navigate to="/browse" />
        )
      ) : (
        <LoginPage />
      ),
      children: [
        {
          path: "/admin",
          element: <AdminHome />,
        },
        {
          path: "/admin/user",
          element: <AdminUser />,
        },
        {
          path: "/admin/role",
          element: <AdminRole />,
        },
        {
          path: "/admin/role/view/:idRole",
          element: <AdminRoleView />,
        },
        {
          path: "/admin/role/edit/:idRole",
          element: <AdminRoleEdit />,
        },
        {
          path: "/admin/role/create",
          element: <AdminRoleCreate />,
        },
        {
          path: "/admin/policy",
          element: <AdminPolicy />,
        },
        {
          path: "/admin/policy/create",
          element: <AdminPolicyCreate />,
        },
        {
          path: "/admin/policy/edit/:idPermission",
          element: <AdminPolicyEdit />,
        },
        {
          path: "/admin/policy/view/:idPermission",
          element: <AdminPolicyView />,
        },
        {
          path: "/admin/permission",
          element: <AdminPermission />,
        },
        {
          path: "/admin/permission/create",
          element: <AdminPermissionCreate />,
        },
        {
          path: "/admin/permission/view/:idPer",
          element: <AdminPermissionView />,
        },
        {
          path: "/admin/permission/edit/:idPer",
          element: <AdminPermissionEdit />,
        },
        {
          path: "/admin/user/edit/:editId",
          element: <AdminUserEdit />,
        },
        {
          path: "/admin/user/create",
          element: <AdminUserCreate />,
        },
      ],
    },
  ]);

  return routeElements;
}
