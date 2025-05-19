import React, { useState, useEffect } from 'react';

const times = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '14:00', '14:30',
    '15:00', '15:30', '16:00'
];

export default function AppointmentsTab() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // Set default date to today on component mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Section */}
            <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    📅 Chọn ngày tái khám
                </h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border rounded-md p-2 mb-6"
                />

                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    ⏰ Chọn giờ tái khám
                </h2>
                <div className="grid grid-cols-4 gap-2">
                    {times.map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-md border 
                ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Thông tin tái khám</h2>
                <input
                    type="text"
                    placeholder="Bệnh nhân"
                    className="w-full border rounded-md p-2"
                />
                <input
                    type="text"
                    placeholder="Mã bệnh nhân"
                    className="w-full border rounded-md p-2"
                />
                <input
                    type="text"
                    value={selectedDate}
                    readOnly
                    placeholder="Ngày tái khám"
                    className="w-full border rounded-md p-2 bg-gray-100"
                />
                <input
                    type="text"
                    value={selectedTime}
                    readOnly
                    placeholder="Giờ tái khám"
                    className="w-full border rounded-md p-2 bg-gray-100"
                />
                <textarea
                    placeholder="Lý do tái khám..."
                    rows={4}
                    className="w-full border rounded-md p-2"
                />
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Gửi thông báo qua SMS
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Gửi thông báo qua Email
                    </label>
                </div>
            </div>
        </div>
    );
}
