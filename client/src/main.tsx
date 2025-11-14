import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from './components/page/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>,
)
