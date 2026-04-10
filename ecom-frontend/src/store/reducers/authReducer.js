const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedUserCheckoutAddress: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload };

        case "LOGOUT_USER":
            return { ...state, user: null, address: null, clientSecret: null, selectedUserCheckoutAddress: null };

        case "USER_ADDRESS":
            return { ...state, address: action.payload };

        case "SELECT_USER_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: action.payload };

        case "REMOVE_SELECTED_USER_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: null };

        default:
            return state;
    }
};