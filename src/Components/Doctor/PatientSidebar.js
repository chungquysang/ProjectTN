import React, { useState } from 'react';
import {
    ClockIcon,
    Stethoscope,
    CheckCircleIcon,
    XCircleIcon,
    User,
} from 'lucide-react';

// Màu cho biểu tượng icon
const STATUS_ICON_TEXT_COLORS = {
    waiting: 'text-yellow-500',
    examining: 'text-blue-500',
    done: 'text-green-500',
    cancelled: 'text-red-500',
};

// Màu chấm tròn trong danh sách bệnh nhân
const STATUS_COLORS = {
    waiting: 'bg-yellow-400',
    examining: 'bg-blue-500',
    done: 'bg-green-500',
    cancelled: 'bg-red-500',
};

const STATUS_ICONS = {
    waiting: ClockIcon,
    examining: Stethoscope,
    done: CheckCircleIcon,
    cancelled: XCircleIcon,
};

const STATUS_LABELS = {
    waiting: 'Đang đợi',
    examining: 'Đang khám',
    done: 'Đã khám',
    cancelled: 'Hủy',
};

const PatientSidebar = ({ patientsData, selectedPatientId, setSelectedPatientId, setSelectedPatient }) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = patientsData.filter((patient) => {
        const matchesFilter = filter === 'all' || patient.status === filter;
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="w-full h-full flex flex-col p-2 bg-gray-100">

            {/* title name */}
            <div className="flex items-center justify-center h-[50px] bg-gray-100 rounded">
                <h1 className="text-xl font-semibold">Danh Sách Bệnh Nhân</h1>
            </div>
            {/* Search Input */}
            <div className="mb-4 relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="Tìm kiếm bệnh nhân ..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Filter Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                {/* Tất cả */}
                <div
                    onClick={() => setFilter('all')}
                    className={`cursor-pointer rounded-md px-3 py-2 flex flex-col items-center gap-1 border transition-all text-sm
                    ${filter === 'all' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}
                     `}
                >
                    <div className="w-8 h-8 relative flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-gray-400" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium text-center">Tất cả</span>
                </div>

                {/* Các trạng thái */}
                {Object.entries(STATUS_LABELS).map(([key, label]) => {
                    const Icon = STATUS_ICONS[key];
                    return (
                        <div
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`cursor-pointer rounded-md px-3 py-2 flex flex-col items-center gap-1 border transition-all text-sm
                            ${filter === key
                                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'}
                            `}
                        >
                            <Icon className={`w-6 h-6 ${STATUS_ICON_TEXT_COLORS[key]}`} />
                            <span className="text-sm text-gray-700 font-medium text-center">{label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Danh sách bệnh nhân */}
            <div className="flex flex-col gap-2 overflow-y-auto">
                {filteredPatients.map((patient) => (
                    <div
                        key={patient.id}
                        className={`cursor-pointer p-3 rounded border flex justify-between items-start gap-2 transition-all duration-150
                    ${selectedPatientId === patient.id
                                ? 'bg-blue-100 border-l-4 border-blue-600'
                                : 'bg-white border-gray-200'}
                    `}
                        onClick={() => {
                            setSelectedPatientId(patient.id);
                            setSelectedPatient(patient); // gán luôn bệnh nhân được chọn
                        }}
                    >
                        <div className="flex items-start gap-2 w-full">
                            <User className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                                    <span>{patient.name}</span>
                                    <span className="text-xs text-gray-600 font-normal">Mã: {patient.code}</span>
                                </div>
                                <div className="text-xs flex items-center gap-2 mt-1">
                                    <span className={`h-2 w-2 rounded-full ${STATUS_COLORS[patient.status]}`} />
                                    <span>{STATUS_LABELS[patient.status]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default PatientSidebar;
