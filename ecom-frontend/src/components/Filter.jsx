import {FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch} from "react-icons/fi";
import {useEffect, useState} from "react";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
	Button,
} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

const Filter = () => {
	const categories = [
		{categoryId: 1, categoryName: "Electronics"},
		{categoryId: 2, categoryName: "Clothing"},
		{categoryId: 3, categoryName: "Books"},
		{categoryId: 4, categoryName: "Home & Kitchen"},
		{categoryId: 5, categoryName: "Sports & Outdoors"},
	];

	const [searchParams] = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = useLocation().pathname;
	const navigate = useNavigate();

	const [category, setCategory] = useState("all");
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const currentCategory = searchParams.get("category") || "all";
		const currentSortOrder = searchParams.get("sortby") || "all";
		const currentSearchTerm = searchParams.get("keyword") || "";

		setCategory(currentCategory);
		setSortOrder(currentSortOrder);
		setSearchTerm(currentSearchTerm);
	}, [searchParams]);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchTerm) {
				params.set("keyword", searchTerm);
			} else {
				params.delete("keyword");
			}
			navigate(`${pathname}?${params}`);
		}, 700);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm, params, navigate, pathname]);

	const handleCategoryChange = (event) => {
		const selectedCategory = event.target.value;

		if (selectedCategory == "all") {
			params.delete("category");
		} else {
			params.set("category", selectedCategory);
		}
		navigate(`${pathname}?${params}`);
		setCategory(event.target.value);
	};

	const toggleSortOrder = () => {
		setSortOrder((prev) => {
			const newSortOrder = prev === "asc" ? "desc" : "asc";
			params.set("sortby", newSortOrder);
			navigate(`${pathname}?${params}`);
			return newSortOrder;
		});
	};

	const handleClearFilter = () => {
		navigate({pathname: window.location.pathname});
	};

	return (
		<div className="flex lg:flex-row flex-col-reverse lg:justify-between items-center gap-4">
		
        	{/* SEARCH BAR */}
			<div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
				<input
					type="text"
					placeholder="Search products"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border border-gray-400 text-slate-800 rounded-md py-2 px-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
				></input>
				<FiSearch className="absolute left-3 text-slate-800 size={20}" />
			</div>

			{/* CATEGORY SELECTION */}
			<div className="flex sm:flex-row flex-col gap-4 items-center">
				<FormControl
					variant="outlined"
					size="small"
					className="text-slate-800 border-slate-700"
				>
					<InputLabel id="category-select-label">Category</InputLabel>
					<Select
						labelId="category-select-label"
						value={category}
						onChange={handleCategoryChange}
						label="Category"
						className="min-w-[120px] text-slate-800 border-slate-700"
					>
						<MenuItem value="all">All</MenuItem>
						{categories.map((item) => (
							<MenuItem key={item.categoryId} value={item.categoryName}>
								{item.categoryName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
                
                {/* SORT BY SELECTION */}
				<Tooltip
					title={
						sortOrder === "asc" ? "Sorted by price:asc" : "Sorted by price:desc"
					}
					placement="top"
				>
					<Button
						variant="contained"
						color="primary"
						className="flex items-center gap-2 h-10"
						onClick={toggleSortOrder}
					>
						Sort By
						{sortOrder === "asc" ? (
							<FiArrowUp size={20} />
						) : (
							<FiArrowDown size={20} />
						)}
					</Button>
				</Tooltip>

                {/* CLEARING FILTERS */}
				<button
					onClick={handleClearFilter}
					className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
				>
					<FiRefreshCw className="font-semibold" size={16} />
					<span className="font-semibold">Clear Filters</span>
				</button>
			</div>
		</div>
	);
};

export default Filter;
