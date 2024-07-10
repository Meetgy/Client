import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import {
  createBrowserRouter,
  RouterProvider,
  } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/Login.jsx';


if (!window.localStorage.getItem("biscut")) {
  window.history.pushState({}, '', "/login");
} else {
  window.history.pushState({}, '', "/");
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
