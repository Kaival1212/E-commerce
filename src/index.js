import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter , RouterProvider}  from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopPage from "./views/ShopPage";
import CatPage from "./views/CatPage";
import ProductPage from "./views/ProductPage";
import AdminPage from "./views/AdminPage";
import EditPage from "./views/EditPage";

const BrowserRouter = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/main',
        element: <ShopPage/>
    },
    {
        path: '/main/category/:id',
        element: <CatPage/>
    },
    {
        path: '/main/category/product/:id',
        element: <ProductPage/>
    },
    {
        path:"/admin",
        element:<AdminPage/>
    },
    {
        path:"/admin/edit/:id",
        element:<EditPage/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
