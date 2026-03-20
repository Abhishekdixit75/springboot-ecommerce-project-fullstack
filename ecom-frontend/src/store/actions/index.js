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
        payload: {...data, quantity: newQuantity},
    });
}