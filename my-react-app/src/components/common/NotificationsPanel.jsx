import React from 'react';

export default function NotificationsPanel({ panelRef }) {
	return (
		<div
			ref={panelRef}
			className='absolute right-0 mt-2 w-64 bg-slate-800 text-white rounded shadow-lg p-3 animate-fadeInDown'
		>
			<div className='font-semibold mb-2'>Notifications</div>
			<div className='text-sm text-gray-300'>No new notifications.</div>
		</div>
	);
}