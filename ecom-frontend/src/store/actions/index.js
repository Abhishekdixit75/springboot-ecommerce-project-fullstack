import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            lastPage: data.lastPage
        });
        dispatch({ type: "IS_SUCCESS" });
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products"
        });
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            lastPage: data.lastPage
        });
        dispatch({ type: "CATEGORY_SUCCESS" });
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories"
        });
    }
}

export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    // find the product
    const products = getState().products?.products || [];
    const getProduct = products.find(
        (item) => item.productId === data.productId
    );

    if (!getProduct) {
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
        toast.success(`${data.productName} added to the cart`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        return;
    }

    // check for stocks
    const isQuantityExist = getProduct.quantity >= qty;

    // if in stock -> add
    if (isQuantityExist) {
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
        toast.success(`${data.productName} added to the cart`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }
    // if not -> error
    else {
        toast.error("Out of Stock");
    }
}

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // find the product
        const products = getState().products?.products || [];
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        if (!getProduct) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: { ...data, quantity: newQuantity }
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            return;
        }

        const newQuantity = currentQuantity + 1;
        const isQuantityExist = getProduct.quantity >= newQuantity;

        if (isQuantityExist) {
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: { ...data, quantity: newQuantity }
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }
    }

export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
    dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({
        type: "REMOVE_CART",
        payload: data,
    });
    toast.success(`${data.productName} removed from the cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {

    try {
        setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        dispatch({
            type: "LOGIN_USER",
            payload: data,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Logged in successfully");
        navigate("/");
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to login");
    }
    finally {
        setLoader(false);
    }
}

export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async () => {

    try {
        setLoader(true);
        const { data } = await api.post("/auth/signup", sendData);
        reset();
        toast.success(data?.message || "User registered successfully");
        navigate("/login");
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to register");
    }
    finally {
        setLoader(false);
    }
}

export const logoutUser = (toast, navigate) => (dispatch) => {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/login");
}

export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
        dispatch({ type: "BUTTON_LOADER" });
        try {
            if (!addressId) {
                await api.post("/addresses", sendData);
            } else {
                await api.put(`/addresses/${addressId}`, sendData);
            }
            dispatch(getUserAddresses());
            toast.success("Address saved successfully");
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
            dispatch({ type: "IS_ERROR", payload: null });
        } finally {
            setOpenAddressModal(false);
        }
    };

export const getUserAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get("/addresses");
        dispatch({ type: "USER_ADDRESS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user's addresses"
        });
    }
}

export const deleteUserAddresses = (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some error occurred while deleting."
        });
    } finally {
        setOpenDeleteModal(false);
    }
}

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_SELECTED_USER_CHECKOUT_ADDRESS"
    }
}

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    
    return {
        type: "SELECT_USER_CHECKOUT_ADDRESS",
        payload: address,
    }
}

export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "IS_FETECHING"
        });
        await api.post("/carts/create", sendCartItems);
        await dispatch(getUserCart());

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create user cart"
        });
    }
}

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "IS_FETECHING"
        });
        const { data } = await api.get("/carts/users/cart");
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })

        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user cart"
        });
    }
}

export const createStripePaymentSecret = (sendData, toast) => async (dispatch) => {

    try {
        dispatch({ type: "IS_FETECHING" });
        const { data } = await api.post("/order/stripe-client-secret", sendData);
        dispatch({ type: "CLIENT_SECRET", payload: data });
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({ type: "IS_SUCCESS" });
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to create client secret");
    }
}

export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {

    try {
        const response = await api.post("/order/users/payments/online", sendData);
        if (response.data) {
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("client-secret");
            localStorage.removeItem("cartItems");
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            toast.success("Payment successful");
        } else {
            setErrorMessage("Payment failed. Please try again");
        }
    }
    catch (error) {
        setErrorMessage("Payment failed. Please try again");
    }
}

export const analyticsAction = () => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING"});
            const { data } = await api.get('/admin/app/analytics');
            dispatch({
                type: "FETCH_ANALYTICS",
                payload: data,
            })
            dispatch({ type: "IS_SUCCESS"});
        } catch (error) {
            dispatch({ 
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch analytics data",
            });
        }
};