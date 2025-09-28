import React from 'react';
import { XCircle } from 'lucide-react';
import { COLORS } from '../../data/mockData';

const DietPlanModal = ({ plan, onClose }) => {
    if (!plan) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <XCircle size={28} />
                </button>
                <h2 className="text-3xl font-bold text-white mb-2">{plan.planName}</h2>
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-6 ${COLORS[plan.dosha === 'Pitta' ? 1 : plan.dosha === 'Vata' ? 0 : 2]} bg-opacity-20 text-white`}>{plan.dosha}</span>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3 border-b border-white/20 pb-2">Key Guidelines</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {plan.guidelines.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3 border-b border-white/20 pb-2">Sample Meal Ideas</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="font-semibold text-white mb-1">Breakfast</p>
                                <p className="text-gray-400">{plan.sampleMeals.breakfast}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="font-semibold text-white mb-1">Lunch</p>
                                <p className="text-gray-400">{plan.sampleMeals.lunch}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="font-semibold text-white mb-1">Dinner</p>
                                <p className="text-gray-400">{plan.sampleMeals.dinner}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DietPlanModal;