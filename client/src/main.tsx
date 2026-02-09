import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from './components/page/NotFound.tsx';
import ExperiencesPage from './components/page/Experiences.tsx';
import BlogsPage from './components/page/Blogs.tsx';
import { ThemeProvider } from './contexts/ThemeContext';

import ProjectsPage from "./components/page/Projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/experiences",
    element: <ExperiencesPage />,
  },
  {
    path: "/blogs",
    element: <BlogsPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>,
)
