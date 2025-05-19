import { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
const PatientInfoTab = ({ patient }) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        birthdate: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        insurance: false,
        insuranceNumber: '',
        insuranceRate: '',
        startDate: '',
        endDate: '',
        note: ''
    });

    useEffect(() => {
        if (patient) {
            setFormData({
                code: patient.code || '',
                name: patient.name || '',
                birthdate: patient.birthdate || '',
                gender: patient.gender || '',
                address: patient.address || '',
                phone: patient.phone || '',
                email: patient.email || '',
                insurance: patient.insurance || false,
                insuranceNumber: patient.insuranceNumber || '',
                insuranceRate: patient.insuranceRate || '',
                startDate: patient.startDate || '',
                endDate: patient.endDate || '',
                note: patient.note || ''
            });
        }
    }, [patient]);
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm max-w grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin cá nhân */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
                <div className="space-y-4">
                    <input type="text" name="ID" placeholder="Mã BN" className="w-full border rounded-lg p-2" value={formData.code} />
                    <input type="text" name="NameC" placeholder="Họ và tên" className="w-full border rounded-lg p-2" value={formData.name} />
                    <div className="flex items-center gap-4">
                        {/* Ngày sinh */}
                        <div className="w-3/5">
                            <label className="block mb-1 text-sm text-gray-700">Ngày sinh</label>
                            <input type="date" className="border rounded-lg p-2 w-full" value={formData.birthdate} />
                        </div>
                        {/* Giới tính */}
                        <div className="w-2/5">
                            <label className="block mb-1 text-sm text-gray-700">Giới tính / Sex</label>
                            <select className="w-full border rounded-lg p-2" value={formData.gender}>
                                <option value="">Chọn</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                    </div>
                    <textarea placeholder="Địa chỉ" className="w-full border rounded-lg p-2 h-20 resize-none" value={formData.address} />
                    <div className="flex gap-4">
                        <input type="text" placeholder="Điện thoại" className="w-1/2 border rounded-lg p-2" value={formData.phone} />
                        <input type="email" placeholder="Email" className="w-1/2 border rounded-lg p-2" value={formData.email} />
                    </div>
                </div>
            </div>

            {/* Thông tin BHYT */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Thông tin BHYT</h2>
                <div className="space-y-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        BHYT
                    </label>
                    <input type="text" placeholder="Số thẻ BHYT" className="w-full border rounded-lg p-2" value={formData.insuranceNumber} />
                    <input type="number" placeholder="Tỉ lệ BH (%)" max={100} min={0} className="w-full border rounded-lg p-2" />
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block mb-1 text-sm text-gray-700">Ngày bắt đầu :</label>
                            <input type="date" name="startDate" className="w-full border rounded-lg p-2" />
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-1 text-sm text-gray-700">Ngày kết thúc :</label>
                            <input type="date" name="endDate" className="w-full border rounded-lg p-2" />
                        </div>
                    </div>
                    <textarea placeholder="Nhập ghi chú về bệnh nhân..." className="w-full border rounded-lg p-2 h-20 resize-none" />
                </div>
                <div className="flex justify-end">
                    <button
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center" >
                        <Upload size={16} className="mr-2" /> Cập nhật
                    </button>
                </div>
            </div>


        </div >

    );
}

export default PatientInfoTab;