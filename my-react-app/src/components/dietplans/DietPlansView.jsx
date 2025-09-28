import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import ModernButton from '../common/ModernButton';
import DietPlanModal from './DietPlanModal';
import { dietPlansData, COLORS } from '../../data/mockData';
import { Plus } from 'lucide-react';

const DietPlansView = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Diet Plans">
                <ModernButton icon={<Plus size={16} />}>Create Plan</ModernButton>
            </PageHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {dietPlansData.map(plan => (
                    <div key={plan.id} className="bg-black/20 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-white">{plan.planName}</h3>
                            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3 ${COLORS[plan.dosha === 'Pitta' ? 1 : plan.dosha === 'Vata' ? 0 : 2]} bg-opacity-20 text-white`}>{plan.dosha}</span>
                            <p className="text-gray-300 text-sm">{plan.description}</p>
                        </div>
                        <ModernButton onClick={() => setSelectedPlan(plan)} className="mt-4 self-start !px-3 !py-1.5 text-xs">
                            View Details
                        </ModernButton>
                    </div>
                ))}
            </div>
            <DietPlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        </div>
    );
};

export default DietPlansView;