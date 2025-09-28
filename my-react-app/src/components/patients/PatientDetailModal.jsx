import React from 'react';
import { XCircle, Mail, Phone, History } from 'lucide-react';

const PatientDetailModal = ({ patient, onClose }) => {
    if (!patient) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><XCircle size={28} /></button>
                <div className="flex items-center gap-6 mb-6">
                    <img src={patient.avatar} alt={patient.name} className="w-24 h-24 rounded-full object-cover border-4 border-purple-400/50" />
                    <div>
                        <h2 className="text-3xl font-bold text-white">{patient.name}</h2>
                        <p className="text-gray-300">{patient.age} years old</p>
                        <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-indigo-500/20 text-indigo-200">{patient.prakriti}</span>
                    </div>
                </div>
                <div className="space-y-4 text-gray-300">
                    <div className="flex items-center gap-3">
                        <Mail size={18} className="text-purple-300" />
                        <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={18} className="text-purple-300" />
                        <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 pt-2">
                        <History size={18} className="text-purple-300 mt-1" />
                        <div>
                            <h3 className="font-semibold text-white mb-1">Clinical History</h3>
                            <p className="text-sm">{patient.history}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailModal;