import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import ModernButton from '../common/ModernButton';
import AppointmentDetailModal from './AppointmentDetailModal';
import { appointmentsData } from '../../data/mockData';
import { Plus, ChevronRight } from 'lucide-react';

const AppointmentsView = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const getStatusClass = (status) => {
        switch (status) {
            case 'Upcoming': return 'bg-blue-500/20 text-blue-300';
            case 'Completed': return 'bg-green-500/20 text-green-300';
            case 'Cancelled': return 'bg-red-500/20 text-red-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Appointments">
                <ModernButton icon={<Plus size={16} />}>New Appointment</ModernButton>
            </PageHeader>
            <div className="space-y-4">
                {appointmentsData.map(appt => (
                    <div key={appt.id} onClick={() => setSelectedAppointment(appt)} className="bg-black/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg hover:bg-white/10 transition-all duration-300 cursor-pointer">
                        <div className="flex-1">
                            <p className="font-bold text-lg text-white">{appt.patientName}</p>
                            <p className="text-gray-300 text-sm">{appt.type}</p>
                        </div>
                        <div className="text-gray-200 text-sm sm:text-base text-left sm:text-right mt-2 sm:mt-0">{appt.date} at {appt.time}</div>
                        <div className="mt-2 sm:mt-0">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(appt.status)}`}>
                                {appt.status}
                            </span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 hidden sm:block" />
                    </div>
                ))}
            </div>
            <AppointmentDetailModal appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
        </div>
    );
};

export default AppointmentsView;