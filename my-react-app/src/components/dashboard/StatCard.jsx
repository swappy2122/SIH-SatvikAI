import React from 'react';

const StatCard = ({ title, value, unit, isText }) => (
    <div className="bg-black/20 p-4 rounded-xl hover:bg-white/10 transition-colors duration-200">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        {isText ? 
            <p className="text-xl font-bold text-white mt-1">{value}</p> :
            <p className="text-2xl font-bold text-white mt-1">{value}<span className="text-base font-medium ml-1 text-gray-300">{unit}</span></p>
        }
    </div>
);

export default StatCard;