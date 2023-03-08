import "../../styles/globals.scss";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "../contexts/AuthContext";
import { AdminAuthProvider } from "../contexts/AdminAuthContext";
import { SidebarProvider } from "../components/admin/SidebarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <SidebarProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </SidebarProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default MyApp;
