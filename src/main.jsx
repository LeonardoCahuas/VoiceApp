// Il tuo file principale
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from "./redux/store"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home'
import Authentication from './Authentication'
import ProtectedRoute from './ProtectedRoute'  // Importa ProtectedRoute

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>  
        <App/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/authentication",
    element: <Authentication/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
