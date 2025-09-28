import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import SearchInput from '../common/SearchInput';
import ModernButton from '../common/ModernButton';
import InventoryDetailModal from './InventoryDetailModal';
import { inventoryData } from '../../data/mockData';
import { Plus } from 'lucide-react';

const InventoryView = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Inventory">
                <SearchInput />
                <ModernButton icon={<Plus size={16} />}>Add Product</ModernButton>
            </PageHeader>
            <div className="hidden md:block bg-black/20 rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-4 font-semibold text-sm">Product Name</th>
                            <th className="p-4 font-semibold text-sm">Category</th>
                            <th className="p-4 font-semibold text-sm">Stock</th>
                            <th className="p-4 font-semibold text-sm">Supplier</th>
                            <th className="p-4 font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map(item => (
                            <tr key={item.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                <td className="p-4 font-medium text-white">{item.productName}</td>
                                <td className="p-4 text-gray-300">{item.category}</td>
                                <td className="p-4 text-gray-300">{item.stock}</td>
                                <td className="p-4 text-gray-300">{item.supplier}</td>
                                <td className="p-4 text-center">
                                    <ModernButton onClick={() => setSelectedItem(item)} className="!px-3 !py-1.5 text-xs">
                                        View Details
                                    </ModernButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden space-y-4">
                {inventoryData.map(item => (
                    <div key={item.id} className="bg-black/20 rounded-xl p-4 shadow-lg" onClick={() => setSelectedItem(item)}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-lg text-white">{item.productName}</p>
                                <p className="text-sm text-purple-300">{item.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-white">{item.stock}</p>
                                <p className="text-sm text-gray-300">In Stock</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <InventoryDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
    );
};

export default InventoryView;