import { useRoutes } from "react-router-dom";
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
import { AdminRole } from "../components/Admin/AdminRole";
import { AdminPolicy } from "../components/Admin/AdminPolicy";
import { AdminPermission } from "../components/Admin/AdminPermission";
import { AdminHome } from "../components/Admin/AdminHome";
import { AdminUserEdit } from "../components/Admin/AdminUser/AdminUserEdit";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/browse",
      element: <MainPage />,
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
      element: <LoginPage />,
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
      element: <AdminPage />,
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
          path: "/admin/policy",
          element: <AdminPolicy />,
        },
        {
          path: "/admin/permission",
          element: <AdminPermission />,
        },
        {
          path: "/admin/user/edit/:editId",
          element: <AdminUserEdit />,
        },
      ],
    },
  ]);

  return routeElements;
}
