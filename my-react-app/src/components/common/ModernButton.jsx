import React from 'react';

const ModernButton = ({ children, icon, className = '', ...props }) => (
    <button className={`flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white font-semibold hover:bg-white/20 transition-all duration-300 text-sm ${className}`} {...props}>
        {icon}
        {children}
    </button>
);

export default ModernButton;