import "../../styles/globals.scss";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "../contexts/AuthContext";
import { AdminAuthProvider } from "../contexts/AdminAuthContext";
import { SidebarProvider } from "../contexts/SidebarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <SidebarProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </SidebarProvider>
      </AuthProvider>
    </AdminAuthProvider>
  );
}

export default MyApp;
