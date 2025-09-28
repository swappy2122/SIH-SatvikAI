import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import PageHeader from '../common/PageHeader';
import ModernButton from '../common/ModernButton';
import StatCard from './StatCard';
import { weeklyActivityData, upcomingAppointments, doshaData, COLORS } from '../../data/mockData';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
                {payload.name}
            </text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 4} outerRadius={outerRadius + 8} fill={fill} />
        </g>
    );
};

const DashboardView = ({ setActivePage }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => setActiveIndex(index);
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white space-y-8 animate-fadeIn">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-1 space-y-8">
                    {/* Upcoming Appointments */}
                    <div className="bg-black/20 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4">Upcoming Appointments</h2>
                        <div className="space-y-4">
                            {upcomingAppointments.map(patient => (
                                <div key={patient.id} className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg transition-colors duration-200">
                                    <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-white">{patient.name}</p>
                                        <p className="text-sm text-gray-400">{patient.condition}</p>
                                    </div>
                                    <p className="ml-auto text-sm text-gray-300">{patient.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
               </div>
               <div className="lg:col-span-2">
                    {/* Featured Card */}
                    <div className="relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 rounded-2xl shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between">
                        <div className="absolute -right-20 -top-20 w-60 h-60 bg-indigo-500/30 rounded-full filter blur-3xl"></div>
                        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-purple-500/30 rounded-full filter blur-3xl"></div>
                        <div>
                            <h3 className="text-indigo-300 font-semibold">Featured Focus</h3>
                            <h2 className="text-4xl font-bold text-white mt-2">Current Dosha Balance</h2>
                            <p className="text-gray-300 mt-2 max-w-md">Maintaining equilibrium in the doshas is key to Ayurvedic wellness. This chart reflects the current dominant energies in your system.</p>
                        </div>
                        <div className="flex justify-end">
                           <ModernButton onClick={() => setActivePage('Reports')}>View Full Report</ModernButton>
                        </div>
                    </div>
               </div>
           </div>
           <div className="space-y-8">
                <div>
                     <h2 className="text-2xl font-bold text-white mb-4">Health Overview</h2>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <StatCard title="Heart Rate" value="72" unit="bpm" />
                        <StatCard title="Calories" value="1,850" unit="kcal" />
                        <StatCard title="Sleep" value="7.5" unit="hrs" />
                        <StatCard title="Water" value="2.1" unit="L" />
                        <StatCard title="Prakriti" value="Vata-Pitta" isText={true} />
                     </div>
                </div>
                <div>
                     <h2 className="text-2xl font-bold text-white mb-4">Analysis & Trends</h2>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-black/20 p-6 rounded-2xl">
                             <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>
                             <div style={{ width: '100%', height: 250 }}>
                                 <ResponsiveContainer>
                                     <BarChart data={weeklyActivityData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                                         <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" axisLine={false} tickLine={false} />
                                         <YAxis stroke="rgba(255, 255, 255, 0.5)" axisLine={false} tickLine={false} yAxisId="left" orientation="left" />
                                         <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '10px' }} cursor={{fill: 'rgba(136, 132, 216, 0.1)'}} />
                                         <Bar yAxisId="left" dataKey="calories" fill="#818CF8" name="Calories" radius={[10, 10, 0, 0]} barSize={15} />
                                         <Bar yAxisId="left" dataKey="steps" fill="#A78BFA" name="Steps" radius={[10, 10, 0, 0]} barSize={15} />
                                     </BarChart>
                                 </ResponsiveContainer>
                             </div>
                         </div>
                         <div className="bg-black/20 p-6 rounded-2xl flex flex-col items-center justify-center">
                             <h3 className="text-lg font-semibold text-white mb-4">Dosha Balance</h3>
                             <div style={{ width: '100%', height: 200 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                         <Pie data={doshaData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5} activeIndex={activeIndex} activeShape={renderActiveShape} onMouseEnter={onPieEnter} >
                                            {doshaData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                             </div>
                         </div>
                     </div>
                </div>
           </div>
        </div>
    );
};

export default DashboardView;