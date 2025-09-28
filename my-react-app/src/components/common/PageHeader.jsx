import React from 'react';

const PageHeader = ({ title, children }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
            {children}
        </div>
    </div>
);

export default PageHeader;