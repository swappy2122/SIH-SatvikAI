import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ModernButton from '../components/common/ModernButton';
import { UserCircle, Building, Bell, Edit3 } from 'lucide-react';

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [notifications, setNotifications] = useState({
        emailAppointments: true,
        emailNewsletters: false,
        smsReminders: true,
    });
    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };
    const renderSettingsContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <div className="animate-fadeIn">
                        <h3 className="text-2xl font-semibold text-white mb-6">Profile Information</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <img src="https://i.pravatar.cc/150?img=10" alt="Practitioner" className="w-24 h-24 rounded-full object-cover border-4 border-white/20"/>
                                <div className="text-center sm:text-left">
                                    <ModernButton icon={<Edit3 size={16}/>}>Change Photo</ModernButton>
                                    <p className="text-sm text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                                    <input type="text" defaultValue="Dr. Evelyn Reed" className="w-full mt-2 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                                    <input type="email" defaultValue="evelyn.reed@ayurveda.clinic" className="w-full mt-2 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                                </div>
                            </div>
                            <ModernButton className="bg-purple-600/50 hover:bg-purple-600/80 border-purple-500">Save Changes</ModernButton>
                        </div>
                    </div>
                );
            case 'Clinic':
                return (
                    <div className="animate-fadeIn">
                        <h3 className="text-2xl font-semibold text-white mb-6">Clinic Details</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-gray-300">Clinic Name</label>
                                <input type="text" defaultValue="AyurVeda Wellness Center" className="w-full mt-2 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-300">Address</label>
                                <textarea rows="3" defaultValue="123 Dharma Lane, Wellness City, 12345" className="w-full mt-2 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                            </div>
                            <ModernButton className="bg-purple-600/50 hover:bg-purple-600/80 border-purple-500">Save Changes</ModernButton>
                        </div>
                    </div>
                );
            case 'Notifications':
                return (
                    <div className="animate-fadeIn">
                        <h3 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-white">Email for Appointments</p>
                                    <p className="text-sm text-gray-400">Receive email notifications for new bookings and cancellations.</p>
                                </div>
                                <div onClick={() => handleToggle('emailAppointments')} className={`w-14 h-8 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 flex-shrink-0 ${notifications.emailAppointments ? 'bg-purple-600' : 'bg-slate-600'}`}>
                                    <span className={`w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${notifications.emailAppointments ? 'translate-x-6' : 'translate-x-0'}`}/>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-white">Email Newsletters</p>
                                    <p className="text-sm text-gray-400">Receive occasional newsletters with Ayurvedic tips and offers.</p>
                                </div>
                                <div onClick={() => handleToggle('emailNewsletters')} className={`w-14 h-8 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 flex-shrink-0 ${notifications.emailNewsletters ? 'bg-purple-600' : 'bg-slate-600'}`}>
                                    <span className={`w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${notifications.emailNewsletters ? 'translate-x-6' : 'translate-x-0'}`}/>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-white">SMS Reminders</p>
                                    <p className="text-sm text-gray-400">Send SMS reminders to patients 24 hours before appointments.</p>
                                </div>
                                <div onClick={() => handleToggle('smsReminders')} className={`w-14 h-8 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 flex-shrink-0 ${notifications.smsReminders ? 'bg-purple-600' : 'bg-slate-600'}`}>
                                    <span className={`w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${notifications.smsReminders ? 'translate-x-6' : 'translate-x-0'}`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    const settingsTabs = [
        { name: 'Profile', icon: <UserCircle size={20} /> },
        { name: 'Clinic', icon: <Building size={20} /> },
        { name: 'Notifications', icon: <Bell size={20} /> },
    ];
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white animate-fadeIn">
            <PageHeader title="Settings" />
            <div className="bg-black/20 rounded-xl shadow-lg min-h-[400px] flex flex-col lg:flex-row">
                <nav className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 p-4">
                    <ul className="flex flex-row overflow-x-auto lg:flex-col gap-2">
                        {settingsTabs.map(tab => (
                            <li key={tab.name}>
                                <button onClick={() => setActiveTab(tab.name)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-300 ${activeTab === tab.name ? 'bg-white/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
                                    {tab.icon}
                                    <span className="font-medium text-sm">{tab.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex-1 p-6 md:p-8">
                    {renderSettingsContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;