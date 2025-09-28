export const doshaData = [
    { name: 'Vata', value: 400 },
    { name: 'Pitta', value: 300 },
    { name: 'Kapha', value: 300 },
];

export const COLORS = ['#A78BFA', '#818CF8', '#F472B6'];

export const weeklyActivityData = [
    { name: 'Mon', calories: 2200, steps: 8500 },
    { name: 'Tue', calories: 2100, steps: 7200 },
    { name: 'Wed', calories: 2400, steps: 9800 },
    { name: 'Thu', calories: 2300, steps: 8900 },
    { name: 'Fri', calories: 2500, steps: 10500 },
    { name: 'Sat', calories: 2600, steps: 12500 },
    { name: 'Sun', calories: 2550, steps: 9200 },
];

export const upcomingAppointments = [
    { id: 1, name: "Anjali Sharma", time: "10:30 AM", condition: "Pitta Imbalance", avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: "Rohan Verma", time: "11:15 AM", condition: "Vata Aggravation", avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: "Priya Singh", time: "12:00 PM", condition: "Kapha-Vata constitution", avatar: 'https://i.pravatar.cc/150?img=3' },
];

export const patientsData = [
    { id: 1, name: "Anjali Sharma", age: 34, prakriti: "Pitta-Kapha", lastVisit: "2023-10-15", avatar: 'https://i.pravatar.cc/150?img=1', email: "anjali.sharma@example.com", phone: "987-654-3210", history: "Chronic acidity and skin rashes. Responding well to Pitta pacifying diet." },
    { id: 2, name: "Rohan Verma", age: 45, prakriti: "Vata", lastVisit: "2023-10-12", avatar: 'https://i.pravatar.cc/150?img=2', email: "rohan.verma@example.com", phone: "876-543-2109", history: "Reports issues with anxiety and dry skin. Vata grounding diet suggested." },
    { id: 3, name: "Priya Singh", age: 28, prakriti: "Kapha-Vata", lastVisit: "2023-10-18", avatar: 'https://i.pravatar.cc/150?img=3', email: "priya.singh@example.com", phone: "765-432-1098", history: "Suffering from sluggishness and congestion. Kapha energizing diet initiated." },
    { id: 4, name: "Amit Patel", age: 52, prakriti: "Pitta", lastVisit: "2023-09-25", avatar: 'https://i.pravatar.cc/150?img=4', email: "amit.patel@example.com", phone: "654-321-0987", history: "Patient has a history of high blood pressure and irritability." },
    { id: 5, name: "Sunita Reddy", age: 41, prakriti: "Vata-Pitta", lastVisit: "2023-10-20", avatar: 'https://i.pravatar.cc/150?img=5', email: "sunita.reddy@example.com", phone: "543-210-9876", history: "Deals with digestive issues and inflammation. A balanced diet was prescribed." },
];

export const appointmentsData = [
    { id: 1, patientName: "Anjali Sharma", date: "2023-11-05", time: "10:30 AM", type: "Follow-up", status: "Upcoming", notes: "Review diet plan effectiveness and skin condition. Discuss any new symptoms." },
    { id: 2, patientName: "Rohan Verma", date: "2023-11-05", time: "11:15 AM", type: "Initial Consultation", status: "Upcoming", notes: "Conduct a full Prakriti analysis. Discuss lifestyle and dietary habits." },
    { id: 3, name: "Vikram Kumar", date: "2023-11-06", time: "09:00 AM", type: "Panchakarma Session", status: "Upcoming", notes: "Patient is scheduled for Abhyanga and Swedana therapy." },
    { id: 4, patientName: "Priya Singh", date: "2023-11-02", time: "02:00 PM", type: "Follow-up", status: "Completed", notes: "Patient reported significant improvement in energy levels. Continued current plan." },
    { id: 5, patientName: "Amit Patel", date: "2023-11-01", time: "10:00 AM", type: "Follow-up", status: "Completed", notes: "Blood pressure is stable. Patient is calmer. Minor tweaks to herbal supplements." },
    { id: 6, patientName: "Neha Desai", date: "2023-11-03", time: "01:30 PM", type: "Initial Consultation", status: "Cancelled", notes: "Patient cancelled due to a personal emergency. Needs to reschedule." },
];

export const dietPlansData = [ { id: 1, planName: "Pitta Pacifying Diet", dosha: "Pitta", description: "A cooling diet to balance pitta dosha, focusing on sweet, bitter, and astringent tastes.", guidelines: ["Favor cool, heavy, and slightly dry foods.","Incorporate sweet fruits like melons, cherries, and grapes.","Include cooling vegetables like cucumber, broccoli, and zucchini.","Avoid spicy, salty, and sour foods.","Drink cool (but not iced) water and herbal teas."], sampleMeals: { breakfast: "Oatmeal with sweet berries and a touch of maple syrup.", lunch: "Basmati rice with steamed vegetables and mung dal.", dinner: "Baked sweet potato with a side of asparagus and a light salad." } }, { id: 2, planName: "Vata Grounding Diet", dosha: "Vata", description: "A warm, nourishing diet to ground vata dosha, with sweet, sour, and salty tastes.", guidelines: ["Eat warm, cooked, and oily foods.","Incorporate sweet, ripe fruits and cooked vegetables.","Use warming spices like ginger, cinnamon, and cumin.","Avoid cold, dry, and raw foods.","Maintain a regular meal schedule."], sampleMeals: { breakfast: "Warm spiced milk with cooked rice cereal.", lunch: "Kitchari (rice and lentil porridge) with ghee.", dinner: "Root vegetable stew with whole-wheat bread." } }, { id: 3, planName: "Kapha Energizing Diet", dosha: "Kapha", description: "A light, stimulating diet to energize kapha dosha, emphasizing pungent, bitter, and astringent foods.", guidelines: ["Favor light, dry, and warm foods.","Eat plenty of pungent and bitter vegetables like leafy greens.","Use stimulating spices such as black pepper, cayenne, and turmeric.","Avoid heavy, oily, and cold foods, especially dairy.","Focus on a lighter dinner and avoid snacking."], sampleMeals: { breakfast: "Stewed apples with cinnamon.", lunch: "Quinoa with stir-fried vegetables and chickpeas.", dinner: "Lentil soup with a side of steamed broccoli." } }, { id: 4, planName: "Tridoshic Harmony Diet", dosha: "Tridoshic", description: "A balanced diet suitable for all dosha types, promoting overall wellness and harmony.", guidelines: ["Focus on fresh, organic, and seasonal foods.","Include all six tastes (sweet, sour, salty, pungent, bitter, astringent) in moderation.","Eat mindfully and in a calm environment.","Listen to your body's hunger and fullness cues.","Incorporate gentle spices like coriander and fennel."], sampleMeals: { breakfast: "Cooked grains with seasonal fruit.", lunch: "A balanced plate of whole grains, lean protein, and mixed vegetables.", dinner: "A simple vegetable and lentil curry with rice." } },];
export const consultationsData = [ { id: 1, patientName: "Priya Singh", date: "2023-10-18", summary: "Discussed progress on Kapha-Vata diet. Patient reports improved energy levels. Minor adjustments to herbal supplements made." }, { id: 2, patientName: "Anjali Sharma", date: "2023-10-15", summary: "Initial consultation for Pitta imbalance. Recommended cooling foods, stress management techniques, and Abhyanga massage." }, { id: 3, patientName: "Rohan Verma", date: "2023-10-12", summary: "Follow-up on Vata aggravation. Patient feels more grounded. Advised to continue with routine and meditation." },];
export const inventoryData = [ { id: 1, productName: "Triphala Churna", stock: 45, category: "Herbal Powders", supplier: "Banyan Botanicals", description: "A classic Ayurvedic herbal formulation for detoxification and rejuvenation." }, { id: 2, productName: "Ashwagandha Tablets", stock: 80, category: "Tablets", supplier: "Himalaya Wellness", description: "An adaptogenic herb that helps the body manage stress and boosts vitality." }, { id: 3, productName: "Mahanarayan Oil", stock: 25, category: "Medicated Oils", supplier: "Vaidya's Ayurveda", description: "A traditional massage oil used to soothe sore muscles and joints." }, { id: 4, productName: "Chyawanprash", stock: 60, category: "Herbal Jams", supplier: "Dabur", description: "A nutritive jam rich in antioxidants that supports immunity and overall health." },];
export const billingData = [ { id: 1, invoiceId: "INV-2023-001", patientName: "Anjali Sharma", date: "2023-11-05", amount: 150.00, status: "Paid", items: [{ name: "Follow-up Consultation", qty: 1, price: 75.00 }, { name: "Pitta Pacifying Tea", qty: 3, price: 25.00 }] }, { id: 2, invoiceId: "INV-2023-002", patientName: "Rohan Verma", date: "2023-11-05", amount: 250.00, status: "Pending", items: [{ name: "Initial Consultation", qty: 1, price: 150.00 }, { name: "Vata Grounding Oil", qty: 2, price: 50.00 }] }, { id: 3, invoiceId: "INV-2023-003", patientName: "Priya Singh", date: "2023-11-02", amount: 85.00, status: "Paid", items: [{ name: "Follow-up Consultation", qty: 1, price: 75.00 }, { name: "Herbal Supplement", qty: 1, price: 10.00 }] }, { id: 4, invoiceId: "INV-2023-004", patientName: "Amit Patel", date: "2023-11-01", amount: 120.00, status: "Overdue", items: [{ name: "Follow-up Consultation", qty: 1, price: 75.00 }, { name: "Pitta Cooling Herbs", qty: 1, price: 45.00 }] },];