import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Partials/Navbar';
import reportWebVitals from './reportWebVitals';
import TicTacToe from './TicTacToe';
import Home from './Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  { 
    path: '/',
    element: <Home />,
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
])
root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
