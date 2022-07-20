import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//client
import Layout from "./comps/Layout";
import CreateStore from "./pages/createStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./comps/utils/Logout";
import Signup from "./pages/Signup";
import UpdateAccount from "./pages/UpdateAccount";
import Page404 from "./pages/page404";
import AllStores from "./pages/Stores";
import About from "./pages/about";
import StoreHome from "./pages/StoreHome";
import MyStores from "./pages/myStores";
// store Admin imports
import LayoutStore from "./storeAdmin/layoutStore";
import EditStoreAdmin from "./storeAdmin/editStoreAdmin";

import ProductsStoreAdmin from "./storeAdmin/productsStoreAdmin";
import EditProductAdminStore from "./storeAdmin/editProductAdminStore";
import AddProductStoreAdmin from "./storeAdmin/addProductStoreAdmin";
// admin imports
import LayoutAdmin from "./admin/layoutAdmin";
import AdminHome from "./admin/adminHome";
import UsersList from "./admin/usersList";
import OrdersAdmin from "./admin/orders/ordersAdmin";
import OrderInfoAdmin from "./admin/orders/orderInfoAdmin";
import StoresAdmin from "./admin/storesAdmin";
import ProductsAdmin from "./admin/productsAdmin";
import HomeStore from "./storeAdmin/adminHome";
import FavsProducts from "./pages/favsProducts";
import Checkout from "./comps/orders_comps/checkout";
import OldOrders from "./comps/orders_comps/oldOrders";
import OldOrderInfoClient from "./comps/orders_comps/oldOrderInfoClient";

function AppRouts() {
  return (
    <BrowserRouter>
      <Routes>
        {/* client */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/uptateAccount" element={<UpdateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<FavsProducts />} />
          <Route path="/myStores" element={<MyStores />} />
          <Route path="/stores" element={<AllStores />} />
          <Route path="/store/:id" element={<StoreHome />} />
          <Route path="/createStore" element={<CreateStore />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/oldOrders" element={<OldOrders />} />
          <Route path="/oldOrders/:idOrder" element={<OldOrderInfoClient />} />
          {/* <Route path="/searchStore/:searchQ" element={<SearchStore />} /> */}
        </Route>
        {/*store admin*/}
        <Route path="/storeAdmin/:id" element={<LayoutStore />}>
          <Route index element={<HomeStore />} />
          <Route path="/storeAdmin/:id/editStore" element={<EditStoreAdmin />} />
          <Route path="/storeAdmin/:id/products" element={<ProductsStoreAdmin />} />
          <Route path="/storeAdmin/:id/products/edit/:prodId" element={<EditProductAdminStore />} />
          <Route path="/storeAdmin/:id/products/addProduct" element={<AddProductStoreAdmin />} />
        </Route>
        {/*admin*/}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/stores" element={<StoresAdmin />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
          <Route path="/admin/orders" element={<OrdersAdmin />} />
          <Route path="/admin/orders/:id" element={<OrderInfoAdmin />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouts;
