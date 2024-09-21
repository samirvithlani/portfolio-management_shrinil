import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserSideBar } from "../components/user/UserSideBar";
import React from "react";
import { PortFolioMain } from "../components/user/PortFolioMain";
import CreatePorfolio from "../components/user/CreatePortfolio";
import { Login } from "../components/common/Login";
import UserRegistration from "../components/user/UserRegistration";
import { CreatorResume } from "../components/user/CreatorResume";

const MainRouter = ({ children }) => {

    const routesData = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            errorElement: <div>404</div>,
          },
          {
            path:"/register",
            element:<UserRegistration/>,
            errorElement:<div>404</div>,
          },
          {
            path:"/user",
            element:<UserSideBar/>,
            errorElement:<div>404</div>,
            children:[
                {
                  path:"main",
                  element:<PortFolioMain/>,
                  errorElement:<div>404</div>,
                },
                {
                  path:"create",
                  element:<CreatePorfolio/>,
                  errorElement:<div>404</div>,
                },
                {
                  path:"resume",
                  element:<CreatorResume/>,
                  errorElement:<div>404</div>,
                }
                
              ]
          }
    ])

    return (
        <React.Fragment>
          <RouterProvider router={routesData}>{children}</RouterProvider>
        </React.Fragment>
      );
}
export default MainRouter;