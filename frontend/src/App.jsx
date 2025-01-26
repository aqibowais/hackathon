import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginSignup from "./pages/Auth/LoginSignup";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import OnlyAdminPrivateRoute from "./components/Admin/OnlyAdminPrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col min-w-full min-h-screen">
      <BrowserRouter>
        <Provider store={store}>
          {/* <Header /> */}
          <ScrollToTop />
          <div className="flex-grow bg-gray-50 max-w-full pb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/management/loginSignup" element={<LoginSignup />} />
              {/* <Route path="/management/login" element={<Login />} /> */}

              {/* Admin routes protected by OnlyAdminPrivateRoute */}
              <Route element={<OnlyAdminPrivateRoute />}>
                {/* Add admin-specific routes here */}
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </div>
          {/* <Footer /> */}
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
