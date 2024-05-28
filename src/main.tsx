import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Hangman from './components/Hangman.tsx';
import Puntaje from './components/Puntaje.tsx'; 
import React from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Hangman category={''} word={''} /> // Usa tu componente principal (Hangman) en la ruta raíz "/"
      },
      {
        path: "puntaje",
        element: <Puntaje roundsWon={0} /> // Usa tu componente Puntaje en la ruta "/puntaje"
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)