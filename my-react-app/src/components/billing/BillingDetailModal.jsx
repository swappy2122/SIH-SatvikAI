import React from 'react';
import { XCircle } from 'lucide-react';

const BillingDetailModal = ({ invoice, onClose }) => {
    if (!invoice) return null;
    const getStatusClass = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-500/20 text-green-300';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
            case 'Overdue': return 'bg-red-500/20 text-red-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><XCircle size={28} /></button>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Invoice {invoice.invoiceId}</h2>
                        <p className="text-gray-300">To: {invoice.patientName}</p>
                        <p className="text-gray-400 text-sm">Issued on: {invoice.date}</p>
                    </div>
                    <span className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(invoice.status)} h-fit`}>
                        {invoice.status}
                    </span>
                </div>
                <div className="bg-white/5 rounded-lg p-4 overflow-x-auto">
                    <table className="w-full text-left min-w-[400px]">
                        <thead>
                            <tr className="border-b border-white/10 text-white">
                                <th className="p-2 font-semibold">Item Description</th>
                                <th className="p-2 font-semibold text-center">Qty</th>
                                <th className="p-2 font-semibold text-right">Price</th>
                                <th className="p-2 font-semibold text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item, index) => (
                                <tr key={index} className="text-gray-300">
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2 text-center">{item.qty}</td>
                                    <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                                    <td className="p-2 text-right">${(item.qty * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-6">
                    <div className="text-right">
                        <p className="text-gray-300">Subtotal: <span className="font-semibold text-white">${invoice.amount.toFixed(2)}</span></p>
                        <p className="text-gray-300">Tax (0%): <span className="font-semibold text-white">$0.00</span></p>
                        <p className="text-xl font-bold text-white mt-2 border-t border-white/20 pt-2">Total: ${invoice.amount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingDetailModal;