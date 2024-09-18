import React, { Suspense, useEffect } from "react";
import "./App.css";
import Store from "./redux/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToastContainer from "./components/Notification/ToastContainer";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const ActivationPage = React.lazy(() => import("./pages/ActivationPage"));
//const SellerActivationPage = React.lazy(() => import("./pages/SellerActivationPage"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/ProductDetailsPage")
);
const BestSellingPage = React.lazy(() => import("./pages/BestSellingPage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
//const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ShopCreatePage = React.lazy(() => import("./pages/ShopCreatePage"));
const ShopLoginPage = React.lazy(() => import("./pages/ShopLoginPage"));
const SellerActivationPage = React.lazy(() => import("./pages/SellerActivationPage"));
//const OrderDetailsPage = React.lazy(() => import("./pages/OrderDetailsPage"));
//const TrackOrderPage = React.lazy(() => import("./pages/TrackOrderPage"));
//const UserInbox = React.lazy(() => import("./pages/UserInbox"));

const ShopDashboardPage = React.lazy(() => import("./pages/Shop/ShopDashboardPage"));
const ShopCreateProduct = React.lazy(() => import("./pages/Shop/ShopCreateProduct"));
const ShopAllProducts = React.lazy(() => import("./pages/Shop/ShopAllProducts"));
const ShopCreateEvents = React.lazy(() => import("./pages/Shop/ShopCreateEvents"));
const ShopAllEvents = React.lazy(() => import("./pages/Shop/ShopAllEvents"));
const ShopAllCoupouns = React.lazy(() => import("./pages/Shop/ShopAllCoupouns"));
const ShopPreviewPage = React.lazy(() => import("./pages/Shop/ShopPreviewPage"));
const ShopAllOrders = React.lazy(() => import("./pages/Shop/ShopAllOrders"));
const ShopOrderDetails = React.lazy(() => import("./pages/Shop/ShopOrderDetails"));
const ShopAllRefunds = React.lazy(() => import("./pages/Shop/ShopAllRefunds"));
const ShopSettingsPage = React.lazy(() => import("./pages/Shop/ShopSettingsPage"));
const ShopWithDrawMoneyPage = React.lazy(() => import("./pages/Shop/ShopWithDrawMoneyPage"));
const ShopInboxPage = React.lazy(() => import("./pages/Shop/ShopInboxPage"));

// const AdminDashboardPage = React.lazy(() => import("./pages/AdminDashboardPage"));
// const AdminDashboardUsers = React.lazy(() => import("./pages/AdminDashboardUsers"));
// const AdminDashboardSellers = React.lazy(() => import("./pages/AdminDashboardSellers"));
// const AdminDashboardOrders = React.lazy(() => import("./pages/AdminDashboardOrders"));
// const AdminDashboardProducts = React.lazy(() => import("./pages/AdminDashboardProducts"));
// const AdminDashboardEvents = React.lazy(() => import("./pages/AdminDashboardEvents"));
// const AdminDashboardWithdraw = React.lazy(() => import("./pages/AdminDashboardWithdraw"));


import { loadSeller, loadUser } from "./redux/actions/userActions";
import ProtectedRoute from "./routes/ProtectedRoute";
//import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { ShopHomePage } from "./ShopRoutes";
import { getAllProducts } from "./redux/actions/productActions";
import { getAllEvents } from "./redux/actions/eventActions";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
          {/* <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes> */}
      

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
        <Route path="/product/:id" element={<ProductDetailsPage />} />
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

        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />

        {/* Admin Routes
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        /> */}
      </Routes>
      </Suspense>
      <ToastContainer/>
    </BrowserRouter>
  );
};
export default App;
