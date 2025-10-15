import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);


// --- Configuration ---
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your actual backend URL

// --- Mock Data ---
const mockVerifiedDoctors = [
    { id: 1, user: { name: 'Dr. Sharma' }, specialization: 'Panchakarma', clinic_address: 'Mumbai', years_of_experience: 15, is_verified: true },
    { id: 2, user: { name: 'Dr. Patel' }, specialization: 'Kayachikitsa (Internal Medicine)', clinic_address: 'Delhi', years_of_experience: 10, is_verified: true },
    { id: 3, user: { name: 'Dr. Iyer' }, specialization: 'Shalya Tantra (Surgery)', clinic_address: 'Bangalore', years_of_experience: 22, is_verified: true },
    { id: 4, user: { name: 'Dr. Gupta' }, specialization: 'Panchakarma', clinic_address: 'Delhi', years_of_experience: 18, is_verified: true },
];

const mockPatientProfile = {
    name: "Priya Singh",
    date_of_birth: "1990-05-15",
    medical_history: "Mild asthma, seasonal allergies.",
    lifestyle_habits: "Desk job, 30 minutes of walking daily, sleeps 7 hours.",
    prakriti: "Vata-Pitta",
    vikriti: "High Vata",
    dosha_levels: { vata: 55, pitta: 30, kapha: 15 }
};

const mockPastDietPlans = [{ id: 1, date: "2023-08-01", doctor: "Dr. Sharma", focus: "Pitta Pacifying Diet" }, { id: 2, date: "2023-05-10", doctor: "Dr. Sharma", focus: "Initial Vata Balancing Diet" }];
const mockPastPrescriptions = [{ id: 1, date: "2023-08-01", doctor: "Dr. Sharma", details: "Triphala Churna - 1 tsp at bedtime with warm water." }, { id: 2, date: "2023-05-10", doctor: "Dr. Sharma", details: "Ashwagandha tablets - 1 tablet twice a day after meals." }];
const mockAppointments = [ { id: 1, time: "10:00 AM", patient: "Ravi Kumar", reason: "Follow-up" }, { id: 2, time: "11:30 AM", patient: "Anita Desai", reason: "Initial Consultation" }];
const mockFollowUps = [{id: 1, patient: "Sunil Verma", issue: "Needs diet plan review"}];
const mockProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
        label: 'Symptom Improvement (%)',
        data: [20, 45, 60, 75],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
};

const doshaQuestions = [
    { question: "How would you describe your body frame?", options: { Vata: "Thin, light frame", Pitta: "Medium, muscular frame", Kapha: "Large, sturdy frame" } },
    { question: "What is your typical skin type?", options: { Vata: "Dry, thin, cool", Pitta: "Oily, sensitive, warm", Kapha: "Thick, oily, cool" } },
    { question: "How is your appetite?", options: { Vata: "Irregular, variable", Pitta: "Strong, sharp", Kapha: "Slow, steady" } },
    { question: "What is your dominant emotional tendency under stress?", options: { Vata: "Anxious, fearful", Pitta: "Irritable, aggressive", Kapha: "Calm, withdrawn" } },
];


// --- Main App Component ---
export default function App() {
    const [view, setView] = useState('home'); 
    const renderContent = () => {
        switch (view) {
            case 'patient_dashboard': return <Dashboard user={{ role: 'PATIENT' }} />;
            case 'doctor_dashboard': return <Dashboard user={{ role: 'DOCTOR' }} />;
            default: return <HomePage setView={setView} />;
        }
    };
    return (<div className="min-h-screen bg-gray-50 font-sans text-gray-800"><Navbar setView={setView} /><main className="p-4 sm:p-6 md:p-8">{renderContent()}</main></div>);
}

// --- Generic Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg m-4 max-h-full overflow-y-auto"><div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white"><h3 className="text-xl font-bold text-gray-800">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button></div><div className="p-6">{children}</div></div>
        </div>
    );
};

// --- New Logo Component ---
const Logo = ({ setView }) => (
    <div onClick={() => setView('home')} className="flex items-center gap-2 cursor-pointer group">
        <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-6 transition-transform duration-300">
            <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#34D399'}} /> 
                    <stop offset="100%" style={{stopColor: '#15803D'}} /> 
                </linearGradient>
                <clipPath id="leafClip">
                    <path d="M50 0 C0 50, 0 50, 50 100 C100 50, 100 50, 50 0 Z" />
                </clipPath>
            </defs>
            
            {/* Leaf background */}
            <path d="M50 0 C0 50, 0 50, 50 100 C100 50, 100 50, 50 0 Z" fill="url(#leafGradient)" />
            
            {/* AI Circuit Overlay */}
            <g clipPath="url(#leafClip)">
                <path d="M50 0 V100" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
                
                {/* Lines from center to right */}
                <circle cx="60" cy="50" r="5" fill="#ffffff" fillOpacity="0.7"/>
                <path d="M50 50 H60" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7"/>
                <path d="M60 50 L75 35" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7"/>
                <circle cx="75" cy="35" r="3" fill="#ffffff" fillOpacity="0.7"/>
                <path d="M60 50 L75 65" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7"/>
                <circle cx="75" cy="65" r="3" fill="#ffffff" fillOpacity="0.7"/>
                
                 <path d="M75 35 L90 40" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7"/>
                 <circle cx="90" cy="40" r="2" fill="#ffffff" fillOpacity="0.7"/>
                 <path d="M75 65 L90 60" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7"/>
                 <circle cx="90" cy="60" r="2" fill="#ffffff" fillOpacity="0.7"/>
            </g>
        </svg>
        <span className="text-2xl font-bold text-green-800 group-hover:text-green-900 transition-colors">Satvik-AI</span>
    </div>
);


// --- Layout Components ---
const Navbar = ({ setView }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    return(
    <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Logo setView={setView} />
            <div className="flex items-center gap-4">
                <button onClick={() => setView('home')} className="text-green-700">Home</button>
                <div className="relative">
                     <button onClick={() => setShowNotifications(!showNotifications)} className="text-gray-600 hover:text-green-700 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
                            <div className="p-4 border-b font-bold">Reminders</div>
                            <div className="p-4 text-sm text-gray-700"><strong>1:00 PM:</strong> Time for your Pitta-pacifying lunch.</div>
                            <div className="p-4 text-sm text-gray-700 border-t"><strong>Dinacharya:</strong> Don't forget your evening walk.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
)};

const HomePage = ({ setView }) => (<div className="text-center py-16 px-4"><h1 className="text-5xl font-extrabold text-green-900 mb-4">Ayurveda Meets AI. Your Path to True Wellness.</h1><p className="text-xl text-gray-600 mb-8">Personalized diet, yoga, and lifestyle plans generated by Satvik-AI, guided by certified Ayurvedic doctors.</p><div className="flex justify-center gap-4"><button onClick={() => setView('patient_dashboard')} className="bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition transform hover:scale-105">I'm a Patient</button><button onClick={() => setView('doctor_dashboard')} className="bg-blue-700 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition transform hover:scale-105">I'm a Doctor</button></div></div>);

// --- Dashboard ---
const Dashboard = ({ user }) => {
    if (user.role === 'DOCTOR') return <DoctorDashboard user={user} />;
    return <PatientDashboard user={user} />;
};

// --- Doctor Views (Condensed for brevity) ---
const DoctorDashboard = ({ user }) => {
    const [view, setView] = useState('dashboard');
    const [selectedPatient, setSelectedPatient] = useState(null);

    if (selectedPatient) return <HolisticPatientView patient={selectedPatient} goBack={() => setSelectedPatient(null)} />
    if (view === 'calendar') return <CalendarManagement goBack={() => setView('dashboard')} />;

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-gray-800">Clinician's Dashboard</h2><button onClick={() => setView('calendar')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Manage Calendar</button></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div className="p-6 bg-white rounded-xl shadow-md"><p className="text-gray-500">Total Patients</p><p className="text-3xl font-bold text-green-700">64</p></div><div className="p-6 bg-white rounded-xl shadow-md"><p className="text-gray-500">New Assessments</p><p className="text-3xl font-bold text-blue-700">5</p></div><div className="p-6 bg-white rounded-xl shadow-md"><p className="text-gray-500">Upcoming Appointments</p><p className="text-3xl font-bold text-yellow-700">{mockAppointments.length}</p></div></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md"><h3 className="text-xl font-bold mb-4">Patient List</h3><ul><li onClick={() => setSelectedPatient({id: 1, name: 'Ravi Kumar'})} className="p-3 hover:bg-gray-100 rounded-md cursor-pointer border-b">Ravi Kumar (High Pitta)</li><li onClick={() => setSelectedPatient({id: 2, name: 'Priya Singh'})} className="p-3 hover:bg-gray-100 rounded-md cursor-pointer border-b">Priya Singh (Vata Imbalance)</li></ul></div><div className="space-y-6"><div className="bg-white p-6 rounded-xl shadow-md"><h3 className="text-xl font-bold mb-4">Today's Appointments</h3><ul className="space-y-2">{mockAppointments.map(a => <li key={a.id} className="text-sm">{a.time} - {a.patient}</li>)}</ul></div><div className="bg-white p-6 rounded-xl shadow-md"><h3 className="text-xl font-bold mb-4">Follow-ups Needed</h3><ul className="space-y-2">{mockFollowUps.map(f => <li key={f.id} className="text-sm">{f.patient}: <span className="text-red-600">{f.issue}</span></li>)}</ul></div></div></div>
        </div>
    );
};
const CalendarManagement = ({ goBack }) => (<div><button onClick={goBack} className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">← Back to Dashboard</button><h2 className="text-3xl font-bold mb-6">My Calendar</h2><div className="bg-white p-6 rounded-xl shadow-lg"><div className="grid grid-cols-5 gap-px bg-gray-200 border border-gray-200">{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => <div key={day} className="bg-gray-100 p-2 text-center font-bold">{day}</div>)}{Array.from({ length: 15 }).map((_, i) => <div key={i} className="bg-white h-24 p-1 border-t border-l border-gray-200">{i === 2 && <div className="bg-blue-200 p-1 text-xs rounded">10:00 AM - Ravi K.</div>}{i === 6 && <div className="bg-blue-200 p-1 text-xs rounded">11:30 AM - Anita D.</div>}</div>)}</div></div></div>);
const HolisticPatientView = ({ patient, goBack }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isCommModalOpen, setIsCommModalOpen] = useState(false);
    const tabs = ['overview', 'prakritiAnalysis', 'dietPlan', 'prescription', 'progress'];
    const renderTabContent = () => {
        switch (activeTab) {
            case 'prakritiAnalysis': return <PrakritiAnalysis />;
            case 'dietPlan': return <DietPlanGenerator />;
            case 'prescription': return <DigitalPrescriptionForm />;
            case 'progress': return <PatientProgress />;
            default: return <PatientOverview />;
        }
    }
    return (<><Modal isOpen={isCommModalOpen} onClose={() => setIsCommModalOpen(false)} title="Secure Communication"><p className="text-center">This is a placeholder for the secure chat or video call interface.</p><div className="flex justify-center mt-4"><button onClick={() => setIsCommModalOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Close</button></div></Modal><div><button onClick={goBack} className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">← Back to Dashboard</button><div className="bg-white p-8 rounded-xl shadow-lg"><div className="flex justify-between items-start mb-6"><div><h2 className="text-3xl font-bold">Holistic View: {patient.name}</h2><p className="text-gray-500">Viewing patient record and clinical tools.</p></div><div className="flex gap-2"><button onClick={() => setIsCommModalOpen(true)} className="bg-cyan-500 text-white px-3 py-2 rounded-md hover:bg-cyan-600 text-sm">Start Chat</button><button onClick={() => setIsCommModalOpen(true)} className="bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600 text-sm">Start Video Call</button><button onClick={() => alert("Generating PDF report...")} className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 text-sm">Generate Report</button></div></div><div className="border-b border-gray-200"><nav className="-mb-px flex space-x-6 overflow-x-auto">{tabs.map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1').trim()}</button>))}</nav></div><div className="mt-6">{renderTabContent()}</div></div></div></>);
};
const PatientOverview = () => (<div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div><h3 className="text-xl font-semibold mb-3">Patient Details</h3><p><strong>Medical History:</strong> {mockPatientProfile.medical_history}</p><p><strong>Lifestyle Habits:</strong> {mockPatientProfile.lifestyle_habits}</p><p><strong>Prakriti:</strong> {mockPatientProfile.prakriti}</p><p><strong>Current Imbalance (Vikriti):</strong> {mockPatientProfile.vikriti}</p></div><div><h3 className="text-xl font-semibold mb-3">Visual Dosha Imbalance</h3><DoshaChart data={mockPatientProfile.dosha_levels} /></div></div>);
const PrakritiAnalysis = () => { const [analysisResult, setAnalysisResult] = useState(''); const [loading, setLoading] = useState(false); const handleAnalysis = () => { setLoading(true); setAnalysisResult(''); setTimeout(() => { setAnalysisResult('AI Suggestion: Prakriti appears to be Vata-Pitta. Analysis based on reported dry skin texture and thin hair patterns.'); setLoading(false); }, 2000); }; return (<div><h3 className="text-xl font-semibold mb-4">AI-Assisted Prakriti Analysis</h3><p className="text-sm text-gray-600 mb-4">Upload images to assist with Prakriti determination. This tool supports your professional assessment.</p><div className="flex gap-4 mb-4"><button className="bg-gray-200 px-4 py-2 rounded-md text-sm">Upload Hair Image</button><button className="bg-gray-200 px-4 py-2 rounded-md text-sm">Upload Nails Image</button><button className="bg-gray-200 px-4 py-2 rounded-md text-sm">Upload Skin Image</button></div><button onClick={handleAnalysis} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">{loading ? "Analyzing..." : "Start AI Analysis"}</button>{analysisResult && <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md"><p className="text-blue-800">{analysisResult}</p></div>}</div>); };
const DietPlanGenerator = () => { const [aiDietPlan, setAiDietPlan] = useState(null); const [loadingPlan, setLoadingPlan] = useState(false); const generatePlan = () => { setLoadingPlan(true); setTimeout(() => { setAiDietPlan({ Day1: { Breakfast: { mealName: "Moong Dal Cheela"}, Lunch: { mealName: "Quinoa Khichdi"}}, Day2: { Breakfast: { mealName: "Oats Upma"}, Lunch: { mealName: "Roti with Lauki Sabzi"}}, }); setLoadingPlan(false); }, 1500); }; return (<div><h3 className="text-xl font-semibold mb-3">AI-Generated Recommendations</h3><button onClick={generatePlan} disabled={loadingPlan || aiDietPlan} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">{loadingPlan ? "Generating..." : "Generate AI Diet Plan"}</button>{aiDietPlan && (<div className="mt-6"><h4 className="text-lg font-bold mb-2">Generated Plan (Review & Customize)</h4><div className="space-y-4">{Object.entries(aiDietPlan).map(([day, meals]) => (<div key={day} className="p-4 border rounded-md"><h5 className="font-bold">{day}</h5>{Object.entries(meals).map(([mealType, meal]) => (<div key={mealType} className="ml-4 mt-1 text-sm"><strong>{mealType}:</strong> {meal.mealName}</div>))}</div>))}</div><button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Approve & Send to Patient</button></div>)}</div>); };
const DigitalPrescriptionForm = () => (<div><h3 className="text-xl font-semibold mb-4">Digital Prescription & Record Keeping</h3><div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700">Medicines, Supplements & Dosage</label><textarea rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Triphala Churna - 1 tsp at bedtime..."></textarea></div><div><label className="block text-sm font-medium text-gray-700">Personalized Guidance (Yoga, Pranayama, Lifestyle)</label><textarea rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Practice Anulom Vilom for 10 minutes daily..."></textarea></div><button onClick={() => alert("Prescription saved and sent to patient.")} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Create & Sign Prescription</button></div></div>);
const PatientProgress = () => (<div><h3 className="text-xl font-semibold mb-4">Patient Progress Tracking</h3><div style={{height: '250px'}}><Line options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Symptom Improvement Over Time' } } }} data={mockProgressData} /></div></div>);
const DoshaChart = ({ data }) => { const chartData = { labels: ['Vata', 'Pitta', 'Kapha'], datasets: [{ data: [data.vata, data.pitta, data.kapha], backgroundColor: ['#6366F1', '#F59E0B', '#10B981'], hoverBackgroundColor: ['#4F46E5', '#D97706', '#059669'] }] }; return <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />; };

// --- Patient Views ---

// --- SVG Icons for Patient Dashboard ---
const ClipboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const ChartBarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
const GridIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>);


const PatientDashboard = ({ user }) => {
    const [view, setView] = useState('dashboard');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [waterIntake, setWaterIntake] = useState(4);
    
    const renderPatientContent = () => {
        switch(view) {
            case 'findDoctor': return <FindDoctor />;
            case 'myPlan': return <PersonalizedPlan />;
            case 'records': return <HealthRecords />;
            case 'trackers': return <HealthTrackers />;
            case 'questionnaire': return <DoshaQuestionnaire setView={setView} />;
            case 'wellness': return <CustomizedWellnessSection />;
            case 'profileSetup': return <ProfileSetup setView={setView} />;
            default:
                return (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold">Namaste, {mockPatientProfile.name}!</h2>
                            <p className="text-gray-600">"Health is the greatest gift, contentment the greatest wealth." - Buddha</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center gap-4 mb-4"><div className="bg-green-100 p-2 rounded-full"><ClipboardIcon /></div><h3 className="text-xl font-bold text-gray-800">Today's Focus</h3></div>
                                    <div className="space-y-3 text-gray-700"><p><strong>Meal:</strong> A light, nourishing lunch of Quinoa Khichdi.</p><p><strong>Asana:</strong> Practice Vajrasana for 10 minutes after your meal to aid digestion.</p><p><strong>Routine:</strong> Take a short, mindful walk in the evening.</p></div>
                                    <button onClick={() => setView('myPlan')} className="mt-4 text-sm font-semibold text-green-600 hover:text-green-800">View Full Wellness Plan →</button>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center gap-4 mb-4"><div className="bg-yellow-100 p-2 rounded-full"><ChartBarIcon /></div><h3 className="text-xl font-bold text-gray-800">Track Your Progress</h3></div>
                                    <div>
                                         <label className="text-sm font-medium text-gray-700">Daily Water Intake</label>
                                         <div className="flex items-center gap-4 mt-2"><p className="text-2xl font-bold text-blue-600">{waterIntake * 250} ml</p><button onClick={() => setWaterIntake(w => w + 1)} className="bg-blue-500 text-white rounded-full w-8 h-8 text-lg flex items-center justify-center">+</button><button onClick={() => setWaterIntake(w => Math.max(0, w - 1))} className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 text-lg flex items-center justify-center">-</button></div>
                                    </div>
                                     <button onClick={() => setView('trackers')} className="mt-4 text-sm font-semibold text-yellow-600 hover:text-yellow-800">Open All Health Trackers →</button>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                     <div className="flex items-center gap-4 mb-4"><div className="bg-blue-100 p-2 rounded-full"><CalendarIcon /></div><h3 className="text-xl font-bold text-gray-800">Upcoming Appointment</h3></div>
                                     <p className="text-gray-700"><strong>Dr. Sharma</strong></p><p className="text-sm text-gray-500">Panchakarma Specialist</p><p className="mt-2 font-semibold">Tomorrow at 10:30 AM</p>
                                     <button onClick={() => setView('findDoctor')} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Manage Appointments</button>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center gap-4 mb-4"><div className="bg-purple-100 p-2 rounded-full"><GridIcon /></div><h3 className="text-xl font-bold text-gray-800">Quick Actions</h3></div>
                                     <div className="space-y-2">
                                         <button onClick={() => setView('questionnaire')} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-pink-100 transition">Discover Your Dosha</button>
                                         <button onClick={() => setView('records')} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-purple-100 transition">View Health Records</button>
                                         <button onClick={() => setIsChatOpen(true)} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-green-100 transition">Chat with Doctor</button>
                                          <button onClick={() => setView('profileSetup')} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-200 transition">Setup Profile</button>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }
    
    return (<><Modal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} title="Chat with Dr. Sharma"><ChatModal /></Modal><div className="container mx-auto">{view !== 'dashboard' && <button onClick={() => setView('dashboard')} className="mb-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-md">← Back</button>}{renderPatientContent()}</div></>);
};

const ProfileSetup = ({ setView }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Easy Onboarding & Profile Setup</h2>
        <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" defaultValue={mockPatientProfile.name} /></div>
            <div><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" defaultValue={mockPatientProfile.date_of_birth} /></div>
            <div><label className="block text-sm font-medium text-gray-700">Complete Medical History</label><textarea rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" defaultValue={mockPatientProfile.medical_history}></textarea></div>
            <div><label className="block text-sm font-medium text-gray-700">Lifestyle Habits</label><textarea rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" defaultValue={mockPatientProfile.lifestyle_habits}></textarea></div>
            <button onClick={() => { alert('Profile Saved!'); setView('dashboard'); }} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Save Profile</button>
        </div>
    </div>
);

const DoshaQuestionnaire = ({ setView }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    
    const handleAnswer = (dosha) => {
        setAnswers(prev => ({...prev, [dosha]: (prev[dosha] || 0) + 1 }));
        if (step < doshaQuestions.length - 1) {
            setStep(step + 1);
        } else {
            const result = Object.keys(answers).reduce((a, b) => (answers[a] || 0) > (answers[b] || 0) ? a : b, 'Vata');
            alert(`Your dominant Dosha appears to be ${result}! This is a preliminary assessment.`);
            setView('dashboard');
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Interactive Dosha Questionnaire</h2>
            <p className="text-gray-600 mb-6">Question {step + 1} of {doshaQuestions.length}</p>
            <h3 className="text-xl font-semibold mb-6">{doshaQuestions[step].question}</h3>
            <div className="space-y-4">
                {Object.entries(doshaQuestions[step].options).map(([dosha, text]) => (
                    <button key={dosha} onClick={() => handleAnswer(dosha)} className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-green-100 transition">
                        <strong>{dosha}:</strong> {text}
                    </button>
                ))}
            </div>
        </div>
    );
};

const FindDoctor = () => {
    const [filters, setFilters] = useState({ location: '', specialization: '' });
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const filteredDoctors = mockVerifiedDoctors.filter(d => 
        (filters.location === '' || d.clinic_address.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.specialization === '' || d.specialization.toLowerCase().includes(filters.specialization.toLowerCase()))
    );

    const handleBook = (doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
    };

    return (<>
        <Modal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} title={`Book Appointment with ${selectedDoctor?.user.name}`}>
            <p className="mb-4">Select an available time slot:</p>
            <div className="grid grid-cols-2 gap-2">
                {['10:00 AM', '10:30 AM', '02:00 PM', '02:30 PM'].map(time => <button key={time} onClick={() => {alert(`Appointment booked for ${time}`); setIsBookingModalOpen(false);}} className="p-2 bg-gray-100 rounded-md hover:bg-green-100">{time}</button>)}
            </div>
        </Modal>
        <div>
            <h2 className="text-2xl font-bold mb-4">Find a Verified Doctor</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-lg shadow"><input type="text" placeholder="Filter by Location (e.g., Delhi)" className="flex-grow rounded-md border-gray-300" onChange={e => setFilters({...filters, location: e.target.value})} /><input type="text" placeholder="Filter by Specialization" className="flex-grow rounded-md border-gray-300" onChange={e => setFilters({...filters, specialization: e.target.value})} /></div>
            <div className="space-y-4">{filteredDoctors.map(doctor => (<div key={doctor.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"><div><p className="font-bold text-lg">{doctor.user.name}</p><p className="text-gray-600">{doctor.specialization}</p><p className="text-sm text-gray-500">{doctor.clinic_address} - {doctor.years_of_experience} years experience</p></div><button onClick={() => handleBook(doctor)} className="bg-green-600 text-white px-4 py-2 mt-2 md:mt-0 rounded-md hover:bg-green-700">Book Appointment</button></div>))}</div>
        </div>
    </>);
};

const CustomizedWellnessSection = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Customized Wellness Section</h2>
        <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Recommended Yoga Asanas</h3>
                <p><strong>Vajrasana (Thunderbolt Pose):</strong> Aids digestion. Hold for 5-10 minutes after meals.</p>
                <p><strong>Pawanmuktasana (Wind-Relieving Pose):</strong> Good for bloating and gas. Hold for 1 minute in the morning.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Breathing Exercises (Pranayama)</h3>
                <p><strong>Anulom Vilom (Alternate Nostril Breathing):</strong> Calms the mind and balances energy. Practice for 5-10 minutes daily.</p>
            </div>
        </div>
    </div>
);

const HealthTrackers = () => {
    const [waterIntake, setWaterIntake] = useState(0);
    const [bmi, setBmi] = useState({height: '', weight: '', result: null});
    
    const calculateBmi = () => {
        if(bmi.height > 0 && bmi.weight > 0) {
            const heightInMeters = bmi.height / 100;
            const result = (bmi.weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(prev => ({...prev, result}));
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Health Trackers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Daily Water Intake</h3>
                    <div className="flex items-center gap-4"><p className="text-3xl font-bold text-blue-600">{waterIntake * 250} ml</p><button onClick={() => setWaterIntake(w => w + 1)} className="bg-blue-500 text-white rounded-full w-10 h-10 text-xl flex items-center justify-center">+</button><button onClick={() => setWaterIntake(w => Math.max(0, w - 1))} className="bg-gray-300 text-gray-700 rounded-full w-10 h-10 text-xl flex items-center justify-center">-</button></div>
                    <p className="text-sm text-gray-500 mt-2">{waterIntake} glasses (250ml each)</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">BMI Calculator</h3>
                    <div className="flex gap-2"><input type="number" placeholder="Weight (kg)" className="w-full rounded-md border-gray-300" value={bmi.weight} onChange={e => setBmi({...bmi, weight: e.target.value})}/><input type="number" placeholder="Height (cm)" className="w-full rounded-md border-gray-300" value={bmi.height} onChange={e => setBmi({...bmi, height: e.target.value})}/></div>
                    <button onClick={calculateBmi} className="w-full bg-yellow-500 text-white mt-2 py-2 rounded-lg">Calculate</button>
                    {bmi.result && <p className="text-center font-bold mt-2">Your BMI is: {bmi.result}</p>}
                </div>
                 <div className="p-6 bg-white rounded-lg shadow-md md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Menstrual Cycle Tracker</h3>
                    <p className="text-gray-600 text-sm">Click to log cycle start/end dates on a calendar. (Full calendar UI not implemented).</p>
                    <button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg">Log Period</button>
                </div>
            </div>
        </div>
    );
};

const ChatModal = () => (
    <div className="flex flex-col h-[60vh]">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
            <div className="flex justify-end"><div className="bg-green-600 text-white p-3 rounded-lg max-w-xs">Hello Dr. Sharma, I have a question about my diet plan.</div></div>
            <div className="flex justify-start"><div className="bg-gray-200 p-3 rounded-lg max-w-xs">Hello Priya, of course. How can I help?</div></div>
        </div>
        <div className="p-4 border-t flex gap-2">
            <input type="text" placeholder="Type your message..." className="flex-grow rounded-lg border-gray-300" />
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Send</button>
        </div>
    </div>
);

const PersonalizedPlan = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipeData, setRecipeData] = useState(null);
    const [loadingRecipe, setLoadingRecipe] = useState(false);
    const handleViewRecipe = (foodName) => { setLoadingRecipe(true); setIsModalOpen(true); setRecipeData(null); setTimeout(() => { setRecipeData({ name: foodName, steps: ["Wash and soak lentils.", "Grind into a paste with ginger.", "Add spices.", "Cook on a non-stick pan with ghee."], nutrients: { calories: "Approx. 150 kcal", protein: "10g", carbs: "20g", fats: "3g" } }); setLoadingRecipe(false); }, 1500); };
    return (<><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Recipe: ${recipeData?.name || ''}`}>{loadingRecipe && <p>Generating recipe and analysis...</p>}{recipeData && (<div><h4 className="font-bold text-lg mb-2">Recipe Steps:</h4><ol className="list-decimal list-inside space-y-2 mb-4">{recipeData.steps.map((step, index) => <li key={index}>{step}</li>)}</ol><hr/><h4 className="font-bold text-lg mt-4 mb-2">Nutrient Analysis:</h4><p><strong>Calories:</strong> {recipeData.nutrients.calories}</p><p><strong>Protein:</strong> {recipeData.nutrients.protein}</p></div>)}</Modal><div><h2 className="text-2xl font-bold mb-4">My Wellness Plan</h2><div className="p-6 bg-white rounded-lg shadow-md"><h3 className="text-xl font-semibold mb-2">Diet Chart</h3><p><strong>Breakfast:</strong> <button onClick={() => handleViewRecipe("Moong Dal Cheela")} className="text-blue-600 hover:underline">Moong Dal Cheela</button></p><p><strong>Lunch:</strong> <button onClick={() => handleViewRecipe("Quinoa Khichdi")} className="text-blue-600 hover:underline">Quinoa Khichdi with vegetables</button></p><hr className="my-4"/><h3 className="text-xl font-semibold mb-2">Yoga Asanas</h3><p>Vajrasana (Thunderbolt Pose) - 10 minutes after meals.</p></div></div></>);
};
const HealthRecords = () => (<div><h2 className="text-2xl font-bold mb-4">My Health Records</h2><div className="bg-white p-6 rounded-lg shadow-md space-y-6"><div><h3 className="text-xl font-semibold border-b pb-2 mb-3">Personal & Ayurvedic Details</h3><p><strong>Name:</strong> {mockPatientProfile.name}</p><p><strong>Date of Birth:</strong> {mockPatientProfile.date_of_birth}</p><p><strong>Prakriti (Constitution):</strong> {mockPatientProfile.prakriti}</p><p><strong>Vikriti (Current Imbalance):</strong> {mockPatientProfile.vikriti}</p></div><div><h3 className="text-xl font-semibold border-b pb-2 mb-3">Medical History</h3><p>{mockPatientProfile.medical_history}</p></div><div><h3 className="text-xl font-semibold border-b pb-2 mb-3">Past Diet Plans</h3><ul className="list-disc list-inside space-y-2">{mockPastDietPlans.map(plan => (<li key={plan.id}><strong>{plan.date}:</strong> {plan.focus} with {plan.doctor}</li>))}</ul></div><div><h3 className="text-xl font-semibold border-b pb-2 mb-3">Prescription History</h3><ul className="list-disc list-inside space-y-2">{mockPastPrescriptions.map(p => (<li key={p.id}><strong>{p.date} ({p.doctor}):</strong> {p.details}</li>))}</ul></div><div className="flex gap-4 pt-4"><button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Download Records as PDF</button><button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Share Records</button></div></div></div>);

