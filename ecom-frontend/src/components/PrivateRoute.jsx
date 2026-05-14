import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
   const { user } = useSelector((state) => state.auth);
   const location = useLocation();
   const isAdmin = user && user?.roles?.includes('ROLE_ADMIN');
   const isSeller = user && user?.roles?.includes('ROLE_SELLER');

   if (publicPage) {
      return user ? <Navigate to="/" /> : <Outlet />;
   }

   if (adminOnly) {
      if (isSeller && !isAdmin) {
         const sellerAllowedRoutes = ['/admin/orders', '/admin/products']; // this is used to restrict sellers to only access orders and products page, they should not access dashboard, categories and sellers page

         const sellerAllowed = sellerAllowedRoutes.some((path) =>
            location.pathname.startsWith(path)
         ); // and this is used to check if the current path is allowed for sellers, if not then redirect to home page

         if (!sellerAllowed) {
            return <Navigate to="/" replace />;
         }
      }
   }

   if (!isAdmin && !isSeller) {
      return <Navigate to="/login" />;
   }

   return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
