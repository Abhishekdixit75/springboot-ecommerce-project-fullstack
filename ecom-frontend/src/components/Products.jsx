import { MdDescription } from "react-icons/md";
import ProductCard from "./ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";

const Products = () => {
    const isLoading = false;
    const errorMessage = "";
    const products = [{
        productId: 652,
        productName: "iPhone 14 Pro Max",
        image: "https://placehold.co/600x400",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 0,
        price: 12345.0,
        discount: 10.0,
        specialPrice: 12334.0,
    },
    {
        productId: 653,
        productName: "macbook AIR m2",
        image: "https://placehold.co/600x400",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 0,
        price: 12345.0,
        discount: 10.0,
        specialPrice: 12334.0,
    }];
    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {isLoading ? (
                <p>It is loading...</p>
            ) : errorMessage ? (
                <div className="flex justfy-center items-center h=[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                    <span className="text-slate-800 text-lg font-medium">{errorMessage}</span>
                </div>
            ) : (
                <div className="min-h-[700px]">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {products && products.map((item, i) => <ProductCard key = {i} {...item}/>)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;