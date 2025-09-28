import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import ModernButton from '../common/ModernButton';
import ConsultationDetailModal from './ConsultationDetailModal';
import { consultationsData } from '../../data/mockData';
import { Plus } from 'lucide-react';

const ConsultationsView = () => {
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Consultations">
                <ModernButton icon={<Plus size={16} />}>New Record</ModernButton>
            </PageHeader>
            <div className="space-y-4">
                {consultationsData.map(item => (
                    <div key={item.id} onClick={() => setSelectedConsultation(item)} className="bg-black/20 rounded-xl p-5 shadow-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-bold text-lg text-white">{item.patientName}</p>
                            <p className="text-gray-300 text-sm">{item.date}</p>
                        </div>
                        <p className="text-gray-200 truncate">{item.summary}</p>
                    </div>
                ))}
            </div>
            <ConsultationDetailModal consultation={selectedConsultation} onClose={() => setSelectedConsultation(null)} />
        </div>
    );
};

export default ConsultationsView;