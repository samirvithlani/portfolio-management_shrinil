import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserSideBar } from "../components/user/UserSideBar";
import React from "react";

const MainRouter = ({ children }) => {

    const routesData = createBrowserRouter([
        {
            path: "/",
            element: <h1>LOGIN</h1>,
            errorElement: <div>404</div>,
          },
          {
            path:"/user",
            element:<UserSideBar/>,
            errorElement:<div>404</div>
          }
    ])

    return (
        <React.Fragment>
          <RouterProvider router={routesData}>{children}</RouterProvider>
        </React.Fragment>
      );
}
export default MainRouter;