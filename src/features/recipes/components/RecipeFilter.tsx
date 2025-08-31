import React from "react";

interface Props {
  category: string;
  setCategory: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  categories: string[];
}

const RecipeFilter: React.FC<Props> = ({
  category,
  setCategory,
  search,
  setSearch,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-md px-3 py-2 w-full sm:w-40 cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map(
          (cat, idx) =>
            cat && (
              <option key={`${cat}-${idx}`} value={cat}>
                {cat}
              </option>
            )
        )}
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-3 py-2 flex-grow"
      />
    </div>
  );
};

export default RecipeFilter;
