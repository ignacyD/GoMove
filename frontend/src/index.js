import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AboutUsPage from "./components/AboutUsPage/AboutUsPage";
import HomePage from "./components/HomePage/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path:"/",
                element: <HomePage/>
            },
            {
                path:"/about",
                element: <AboutUsPage/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

