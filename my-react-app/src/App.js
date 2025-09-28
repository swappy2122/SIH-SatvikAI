import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Stethoscope, Leaf, LayoutDashboard, User, Package, CreditCard, Settings, Bell, ChevronRight, X, Bot, Plus, Search, UserCircle, Edit3, Building } from 'lucide-react';

import Logo from './components/common/Logo';
import SearchInput from './components/common/SearchInput';
import Chatbot from './components/common/Chatbot';
import NotificationsPanel from './components/common/NotificationsPanel';

import DashboardView from './components/dashboard/DashboardView';
import PatientsView from './components/patients/PatientsView';
import AppointmentsView from './components/appointments/AppointmentsView';
import DietPlansView from './components/dietplans/DietPlansView';
import ConsultationsView from './components/consultations/ConsultationsView';
import InventoryView from './components/inventory/InventoryView';
import BillingView from './components/billing/BillingView';
import ReportView from './components/reports/ReportView';
import SettingsView from './components/settings/SettingsView';

export default function App() {
    const [activePage, setActivePage] = useState('Dashboard');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationsRef = useRef(null);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Patients', icon: <User size={20} /> },
        { name: 'Appointments', icon: <Calendar size={20} /> },
        { name: 'Diet Plans', icon: <Leaf size={20} /> },
        { name: 'Consultations', icon: <Stethoscope size={20} /> },
        { name: 'Inventory', icon: <Package size={20} /> },
        { name: 'Billing', icon: <CreditCard size={20} /> },
        { name: 'Settings', icon: <Settings size={20} /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target) && !event.target.closest('#notification-button')) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderContent = () => {
        switch (activePage) {
            case 'Dashboard': return <DashboardView setActivePage={setActivePage} />;
            case 'Patients': return <PatientsView />;
            case 'Appointments': return <AppointmentsView />;
            case 'Diet Plans': return <DietPlansView />;
            case 'Consultations': return <ConsultationsView />;
            case 'Inventory': return <InventoryView />;
            case 'Billing': return <BillingView />;
            case 'Reports': return <ReportView setActivePage={setActivePage} />;
            case 'Settings': return <SettingsView />;
            default: return <DashboardView setActivePage={setActivePage} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-sans relative overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110"
                style={{backgroundImage: `url('https://images.unsplash.com/photo-1534439829553-6e3692a5b145?q=80&w=2574&auto=format&fit=crop')`}}
            ></div>
            <div className="relative flex min-h-screen bg-black/40">
                {/* Thin Sidebar */}
                 <nav className="hidden md:flex flex-col items-center gap-4 w-20 bg-black/30 backdrop-blur-lg border-r border-white/10 py-6">
                    <a href="#" className="mb-4"><Logo /></a>
                     <div className="flex flex-col gap-2">
                        {navItems.map(item => (
                            <button
                                key={item.name}
                                onClick={() => setActivePage(item.name)}
                                title={item.name}
                                className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 relative group ${activePage === item.name ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            >
                                {item.icon}
                                {activePage === item.name && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-purple-400 rounded-r-full"></span>}
                                <span className="absolute left-16 w-auto p-2 text-xs text-white bg-slate-800 rounded-md shadow-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-left">{item.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-auto">
                        <img src="https://i.pravatar.cc/150?img=10" alt="Practitioner" className="w-10 h-10 rounded-full object-cover border-2 border-white/20"/>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Nav */}
                    <header className="hidden md:flex items-center justify-between p-4 h-20 bg-black/10 backdrop-blur-lg border-b border-white/10">
                         <div className="flex items-center gap-4">
                             <h1 className="text-xl font-bold text-white">{activePage}</h1>
                         </div>
                         <div className="flex items-center gap-4">
                             <SearchInput />
                             <div className="relative">
                                <button id="notification-button" onClick={() => setIsNotificationsOpen(prev => !prev)} className="relative">
                                     <Bell size={20} className="text-gray-300 hover:text-white cursor-pointer"/>
                                     <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                 </button>
                                {isNotificationsOpen && <NotificationsPanel panelRef={notificationsRef} />}
                             </div>
                         </div>
                    </header>
                    
                    <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                         {renderContent()}
                    </main>
                </div>
                
                <Chatbot />

                 {/* Mobile Bottom Nav */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10 z-50">
                     <div className="flex justify-around p-1">
                        {navItems.slice(0, 5).map(item => (
                            <button
                                key={item.name}
                                onClick={() => setActivePage(item.name)}
                                className={`flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 rounded-lg transition-colors duration-200 ${activePage === item.name ? 'text-purple-400' : 'text-gray-400'}`}
                            >
                                {item.icon}
                                <span className="text-xs mt-1 font-medium">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Inter', sans-serif; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out forwards;
                }
                 @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fadeInDown {
                    animation: fadeInDown 0.2s ease-in-out forwards;
                    transform-origin: top right;
                }
            `}</style>
        </div>
    );
}