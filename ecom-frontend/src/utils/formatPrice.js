export const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

export const formatPriceCalculation = (quantity, price) => {
    return (Number(quantity) * Number(price)).toFixed(2);
};