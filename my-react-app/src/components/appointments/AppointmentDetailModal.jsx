import React from 'react';
import { XCircle } from 'lucide-react';

const AppointmentDetailModal = ({ appointment, onClose }) => {
    if (!appointment) return null;
    const getStatusClass = (status) => {
        switch (status) {
            case 'Upcoming': return 'bg-blue-500/20 text-blue-300';
            case 'Completed': return 'bg-green-500/20 text-green-300';
            case 'Cancelled': return 'bg-red-500/20 text-red-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><XCircle size={28} /></button>
                <h2 className="text-3xl font-bold text-white mb-2">{appointment.patientName}</h2>
                <p className="text-gray-300 mb-4">{appointment.type}</p>
                <div className="flex items-center gap-4 mb-6">
                    <span className="font-semibold text-white">{appointment.date} at {appointment.time}</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(appointment.status)}`}>
                        {appointment.status}
                    </span>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-1">Notes for this session:</h3>
                    <p className="text-gray-300 bg-white/5 p-4 rounded-lg">{appointment.notes}</p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetailModal;