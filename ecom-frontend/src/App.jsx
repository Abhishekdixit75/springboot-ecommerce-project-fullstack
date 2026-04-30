import "./App.css";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import {Toaster} from "react-hot-toast";
import React from "react";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminProducts from "./components/admin/products/AdminProducts";
import Sellers from "./components/admin/sellers/Sellers";
import Category from "./components/admin/categories/Category";
import Orders from "./components/admin/orders/Orders";

function App() {
	return (
		<React.Fragment>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/products" element={<Products />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
					<Route path="/cart" element={<Cart />}></Route>

					<Route element={<PrivateRoute />}>
						<Route path="/checkout" element={<Checkout />}></Route>
						<Route
							path="/order-confirm"
							element={<PaymentConfirmation />}
						></Route>
					</Route>

					<Route element={<PrivateRoute publicPage />}>
						<Route path="/login" element={<LogIn />}></Route>
						<Route path="/register" element={<Register />}></Route>
					</Route>

					<Route element={<PrivateRoute adminOnly />}>
						<Route path="/admin" element={<AdminLayout />}>
							<Route path="" element={<Dashboard />}></Route>
							<Route path="products" element={<AdminProducts />}></Route>
							<Route path="sellers" element={<Sellers />}></Route>
							<Route path="orders" element={<Orders />}></Route>
							<Route path="categories" element={<Category />}></Route>
						</Route>
					</Route>
				</Routes>
			</Router>
			<Toaster position="bottom-center" />
		</React.Fragment>
	);
}

export default App;
