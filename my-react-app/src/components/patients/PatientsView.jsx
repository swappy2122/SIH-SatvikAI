import React, { useState } from 'react';
import PageHeader from '../common/PageHeader';
import SearchInput from '../common/SearchInput';
import ModernButton from '../common/ModernButton';
import PatientDetailModal from './PatientDetailModal';
import { patientsData } from '../../data/mockData';
import { Plus } from 'lucide-react';

const PatientsView = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Patients">
                <SearchInput />
                <ModernButton icon={<Plus size={16} />}>Add Patient</ModernButton>
            </PageHeader>
            <div className="hidden md:block bg-black/20 rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-4 font-semibold text-sm">Name</th>
                            <th className="p-4 font-semibold text-sm">Age</th>
                            <th className="p-4 font-semibold text-sm">Prakriti</th>
                            <th className="p-4 font-semibold text-sm">Last Visit</th>
                            <th className="p-4 font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsData.map(patient => (
                            <tr key={patient.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
                                    <span className="font-medium text-white">{patient.name}</span>
                                </td>
                                <td className="p-4 text-gray-300">{patient.age}</td>
                                <td className="p-4 text-gray-300">{patient.prakriti}</td>
                                <td className="p-4 text-gray-300">{patient.lastVisit}</td>
                                <td className="p-4 text-center">
                                    <ModernButton onClick={() => setSelectedPatient(patient)} className="!px-3 !py-1.5 text-xs">
                                        View Details
                                    </ModernButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden space-y-4">
                {patientsData.map(patient => (
                    <div key={patient.id} className="bg-black/20 rounded-xl p-4 shadow-lg" onClick={() => setSelectedPatient(patient)}>
                        <div className="flex items-center gap-4">
                            <img src={patient.avatar} alt={patient.name} className="w-12 h-12 rounded-full object-cover"/>
                            <div>
                                <p className="font-bold text-lg text-white">{patient.name}</p>
                                <p className="text-sm text-gray-300">{patient.prakriti}</p>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-300">
                            Last Visit: {patient.lastVisit}
                        </div>
                    </div>
                ))}
            </div>
            <PatientDetailModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
        </div>
    );
};

export default PatientsView;