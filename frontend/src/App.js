import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { loadUser, loadSeller } from "./redux/actions/userActions";
import Store from "./redux/store";
import ToastContainer from "./components/Notification/ToastContainer";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import {ShopHomePage} from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const ActivationPage = React.lazy(() => import("./pages/ActivationPage"));
const SellerActivationPage = React.lazy(() =>
  import("./pages/SellerActivationPage")
);
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/ProductDetailsPage")
);
const BestSellingPage = React.lazy(() => import("./pages/BestSellingPage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ShopCreatePage = React.lazy(() => import("./pages/ShopCreatePage"));
const ShopLoginPage = React.lazy(() => import("./pages/ShopLoginPage"));


const ShopDashboardPage = React.lazy(() => import("./pages/Shop/ShopDashboardPage"));


const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route
                path="/activation/:activation_token"
                element={<ActivationPage />}
              />
              <Route
                path="/seller/activation/:activation_token"
                element={<SellerActivationPage />}
              />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:name" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order/success/:id" element={<OrderSuccessPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              {/* shop Routes */}
              <Route path="/shop-create" element={<ShopCreatePage />} />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route path="/shop/:id" element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              } />
            </Routes>
          </Suspense>
          <ToastContainer />
        </BrowserRouter>
  )
};

export default App;
