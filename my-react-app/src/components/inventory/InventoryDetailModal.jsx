import React from 'react';
import { XCircle, Package, Building } from 'lucide-react';

const InventoryDetailModal = ({ item, onClose }) => {
    if (!item) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><XCircle size={28} /></button>
                <h2 className="text-3xl font-bold text-white mb-2">{item.productName}</h2>
                <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-200 mb-6">{item.category}</span>
                <div className="space-y-4 text-gray-300 mb-6">
                    <div className="flex items-center gap-3">
                        <Package size={18} className="text-purple-300" />
                        <span><span className="font-semibold text-white">{item.stock}</span> units in stock</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Building size={18} className="text-purple-300" />
                        <span>Supplier: <span className="font-semibold text-white">{item.supplier}</span></span>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-1">Description</h3>
                    <p className="text-gray-300 bg-white/5 p-4 rounded-lg leading-relaxed">{item.description}</p>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetailModal;