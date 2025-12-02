import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const Home = lazy(() => import("../pages/home/Home"));
const Gallery = lazy(() => import("@/pages/gallery/Gallery"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className=""></div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/gallery",
    element: (
      <Suspense fallback={<div className=""></div>}>
        <Gallery />
      </Suspense>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
