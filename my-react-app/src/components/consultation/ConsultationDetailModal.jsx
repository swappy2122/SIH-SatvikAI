import React from 'react';
import { XCircle } from 'lucide-react';

const ConsultationDetailModal = ({ consultation, onClose }) => {
    if (!consultation) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><XCircle size={28} /></button>
                <h2 className="text-3xl font-bold text-white mb-2">{consultation.patientName}</h2>
                <p className="text-gray-300 mb-6">Consultation on {consultation.date}</p>
                <div>
                    <h3 className="font-semibold text-white mb-1">Session Summary</h3>
                    <p className="text-gray-300 bg-white/5 p-4 rounded-lg leading-relaxed">{consultation.summary}</p>
                </div>
            </div>
        </div>
    );
};

export default ConsultationDetailModal;