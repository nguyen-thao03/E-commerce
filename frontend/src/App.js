import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import Store from "./redux/store";
import ToastContainer from "./components/Notification/ToastContainer";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const ActivationPage = React.lazy(() => import("./pages/ActivationPage"));
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

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? null : (
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
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:name" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order/success/:id" element={<OrderSuccessPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
