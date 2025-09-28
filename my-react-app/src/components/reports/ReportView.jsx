import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import PageHeader from '../common/PageHeader';
import ModernButton from '../common/ModernButton';
import { doshaData, weeklyActivityData, COLORS } from '../../data/mockData';

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

const ReportView = ({ setActivePage }) => {
    const [activeTab, setActiveTab] = useState('Dosha Analysis');
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => setActiveIndex(index);
    const reportTabs = ['Dosha Analysis', 'Activity Trends', 'Dietary Insights'];

    const renderReportContent = () => {
        switch(activeTab) {
            case 'Dosha Analysis':
                return (
                    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-black/20 p-6 rounded-2xl flex flex-col items-center justify-center h-[400px]">
                            <h3 className="text-xl font-semibold text-white mb-4">Current Dosha Balance</h3>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={doshaData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110} fill="#8884d8" paddingAngle={5} activeIndex={activeIndex} activeShape={renderActiveShape} onMouseEnter={onPieEnter}>
                                            {doshaData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="text-gray-300">
                            <h3 className="text-2xl font-bold text-white mb-4">Understanding Your Doshas</h3>
                            <p className="mb-4">Your report indicates a primary constitution of <span className="text-purple-300 font-semibold">Vata-Pitta</span>. This unique blend of energies governs your physiological and psychological tendencies.</p>
                            <p className="mb-2"><strong className="text-white">Vata (Air & Ether):</strong> This energy is associated with movement, creativity, and vitality. When in balance, it fosters enthusiasm and adaptability. An excess can lead to anxiety and dryness.</p>
                            <p><strong className="text-white">Pitta (Fire & Water):</strong> This dosha governs metabolism, digestion, and intelligence. Balanced Pitta brings courage and a sharp intellect, while an imbalance can manifest as irritability and inflammation.</p>
                        </div>
                    </div>
                );
            case 'Activity Trends':
                 return (
                    <div className="animate-fadeIn space-y-6">
                        <h3 className="text-2xl font-semibold text-white">Your Weekly Activity</h3>
                        <div className="bg-black/20 p-6 rounded-2xl">
                             <div style={{ width: '100%', height: 350 }}>
                                 <ResponsiveContainer>
                                     <BarChart data={weeklyActivityData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                                         <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" axisLine={false} tickLine={false} />
                                         <YAxis stroke="rgba(255, 255, 255, 0.5)" axisLine={false} tickLine={false} />
                                         <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '10px' }} cursor={{fill: 'rgba(136, 132, 216, 0.1)'}} />
                                         <Legend wrapperStyle={{color: '#fff'}}/>
                                         <Bar dataKey="calories" fill="#818CF8" name="Calories" radius={[10, 10, 0, 0]} barSize={20} />
                                         <Bar dataKey="steps" fill="#A78BFA" name="Steps" radius={[10, 10, 0, 0]} barSize={20} />
                                     </BarChart>
                                 </ResponsiveContainer>
                             </div>
                         </div>
                    </div>
                 );
            case 'Dietary Insights':
                 return (
                    <div className="animate-fadeIn text-gray-300 space-y-4">
                         <h3 className="text-2xl font-semibold text-white mb-2">Personalized Dietary Insights</h3>
                         <p>Based on your <span className="text-purple-300 font-semibold">Vata-Pitta</span> constitution, focus on a diet that is both grounding and cooling. Emphasize sweet, bitter, and astringent tastes while being mindful of pungent, sour, and salty foods.</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="bg-black/20 p-4 rounded-xl">
                                <h4 className="font-semibold text-white text-lg mb-2">Foods to Favor</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Sweet, ripe fruits like berries, melons, and avocados.</li>
                                    <li>Cooked grains such as rice, oats, and quinoa.</li>
                                    <li>Cooling vegetables like cucumber, sweet potatoes, and leafy greens.</li>
                                    <li>Ghee and coconut oil in moderation.</li>
                                </ul>
                            </div>
                             <div className="bg-black/20 p-4 rounded-xl">
                                <h4 className="font-semibold text-white text-lg mb-2">Foods to Reduce</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Spicy and hot foods like chilies and excessive garlic.</li>
                                    <li>Sour foods like yogurt, cheese, and tomatoes.</li>
                                    <li>Dry and light foods such as crackers and raw vegetables.</li>
                                    <li>Caffeine and carbonated drinks.</li>
                                </ul>
                            </div>
                         </div>
                    </div>
                 );
            default: return null;
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 text-white">
            <PageHeader title="Full Health Report">
                 <ModernButton onClick={() => setActivePage('Dashboard')}>Back to Dashboard</ModernButton>
            </PageHeader>
            <div className="bg-black/20 rounded-xl shadow-lg">
                <div className="border-b border-white/10 px-4">
                    <nav className="flex space-x-1 sm:space-x-4">
                        {reportTabs.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`py-4 px-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${activeTab === tab ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-6">
                    {renderReportContent()}
                </div>
            </div>
        </div>
    )
}

export default ReportView;