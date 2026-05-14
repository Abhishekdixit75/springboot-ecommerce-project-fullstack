import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllSellersDashboard } from '../store/actions/index';

function useSellerFilter() {
   const [searchParams] = useSearchParams(); // this is for getting the query parameters from the url. We will use it for pagination and sorting of the sellers in the admin dashboard.
   const dispatch = useDispatch(); // this is for dispatching the action to fetch the sellers from the backend and set it in the redux store.

   useEffect(() => {
      // we use useEffect hook to fetch the sellers from the backend and set it in the redux store when the component mounts and when the search parameters change.
      const params = new URLSearchParams();

      const currentPage = searchParams.get('page')
         ? Number(searchParams.get('page'))
         : 1;

      params.set('pageNumber', currentPage - 1);

      const queryString = params.toString();
      dispatch(getAllSellersDashboard(queryString));
   }, [dispatch, searchParams]);
}

export default useSellerFilter;
