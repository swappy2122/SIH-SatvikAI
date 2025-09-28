import React from 'react';

export default function SearchInput() {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 rounded bg-slate-800 text-white w-full sm:w-64 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
        </div>
    );
}