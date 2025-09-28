import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import ModernButton from '../common/ModernButton';
import BillingDetailModal from './BillingDetailModal';
import { billingData } from '../../data/mockData';
import { Plus } from 'lucide-react';

const BillingView = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const getStatusClass = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-500/20 text-green-300';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
            case 'Overdue': return 'bg-red-500/20 text-red-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Billing">
                <ModernButton icon={<Plus size={16} />}>Create Invoice</ModernButton>
            </PageHeader>
            <div className="hidden md:block bg-black/20 rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-4 font-semibold text-sm">Invoice ID</th>
                            <th className="p-4 font-semibold text-sm">Patient</th>
                            <th className="p-4 font-semibold text-sm">Date</th>
                            <th className="p-4 font-semibold text-sm">Amount</th>
                            <th className="p-4 font-semibold text-sm">Status</th>
                            <th className="p-4 font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingData.map(invoice => (
                            <tr key={invoice.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                <td className="p-4 font-mono text-sm">{invoice.invoiceId}</td>
                                <td className="p-4 font-medium text-white">{invoice.patientName}</td>
                                <td className="p-4 text-gray-300">{invoice.date}</td>
                                <td className="p-4 text-gray-300">${invoice.amount.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <ModernButton onClick={() => setSelectedInvoice(invoice)} className="!px-3 !py-1.5 text-xs">
                                        View Details
                                    </ModernButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden space-y-4">
                {billingData.map(invoice => (
                    <div key={invoice.id} className="bg-black/20 rounded-xl p-4 shadow-lg" onClick={() => setSelectedInvoice(invoice)}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-lg text-white">{invoice.patientName}</p>
                                <p className="text-sm text-gray-300 font-mono">{invoice.invoiceId}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(invoice.status)}`}>
                                {invoice.status}
                            </span>
                        </div>
                        <div className="mt-4 text-right">
                            <p className="text-xl font-bold text-white">${invoice.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">on {invoice.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <BillingDetailModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
        </div>
    );
};

export default BillingView;