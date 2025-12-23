import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import SignIn from "./pages/SignIn";
import { AddHotel } from "./pages/AddHotel";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "signup",
        element: <Register />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "add-hotels",
        element: <AddHotel />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
])
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App;