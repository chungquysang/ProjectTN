import Siderbar from "../../Components/Siderbar"
import Header from "../../Components/Header"
import { useState, useEffect } from "react"
import { Calendar, Search, Clock, User, Phone, FileText, Sun, Moon } from "lucide-react"
import { format, parseISO, addDays, startOfWeek } from "date-fns"

const sampleAppointments = [
    {
        id: 1,
        patientName: "Nguyễn Văn A",
        patientId: "BN001",
        phone: "0901234567",
        day: 1, // Monday
        time: "07:30",
        duration: 30,
    },
    {
        id: 2,
        patientName: "Trần Thị B",
        patientId: "BN002",
        phone: "0912345678",
        day: 2, // Tuesday
        time: "09:30",
        duration: 30,
    },
    {
        id: 3,
        patientName: "Lê Văn C",
        patientId: "BN003",
        phone: "0923456789",
        day: 3, // Wednesday
        time: "11:00",
        duration: 30,
    },
    {
        id: 4,
        patientName: "Phạm Thị D",
        patientId: "BN004",
        phone: "0934567890",
        day: 4, // Thursday
        time: "14:30",
        duration: 30,
    },
    {
        id: 5,
        patientName: "Hoàng Văn E",
        patientId: "BN005",
        phone: "0945678901",
        day: 5, // Friday
        time: "15:00",
        duration: 30,
    },
    {
        id: 6,
        patientName: "Vũ Thị F",
        patientId: "BN006",
        phone: "0956789012",
        day: 1, // Monday
        time: "10:00",
        duration: 30,
    },
    {
        id: 7,
        patientName: "Đặng Văn G",
        patientId: "BN007",
        phone: "0967890123",
        day: 3, // Wednesday
        time: "13:30",
        duration: 30,
    },
]

const AppointmentSchedule = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredAppointments, setFilteredAppointments] = useState(sampleAppointments)

    const morningTimeSlots = []
    for (let hour = 7; hour <= 11; hour++) {
        if (hour === 7) {
            morningTimeSlots.push("07:30")
        } else {
            morningTimeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
        }
        if (hour !== 7 && hour < 11) {
            morningTimeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
        }
    }
    morningTimeSlots.push("11:30")
    console.log(morningTimeSlots)


    const afternoonTimeSlots = []
    for (let hour = 13; hour <= 16; hour++) {
        if (hour === 13) {
            afternoonTimeSlots.push("13:30")
        } else {
            afternoonTimeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
        }
        if (hour !== 13 && hour < 16) {
            afternoonTimeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
        }
    }
    afternoonTimeSlots.push("16:30")

    console.log(afternoonTimeSlots)

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(startOfWeek(parseISO(selectedDate), { weekStartsOn: 1 }), i)
        const dayNames = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
        return {
            dayNumber: i + 1,
            name: dayNames[i],
            date: format(date, "dd/MM/yyyy"),
        }
    })

    useEffect(() => {
        const filtered = sampleAppointments.filter((appointment) =>
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredAppointments(filtered)
    }, [searchTerm])

    const getAppointment = (day, time) => {
        return filteredAppointments.find((appointment) => appointment.day === day && appointment.time === time)
    }

    const renderTimeSlots = (timeSlots, sessionTitle, icon) => (
        <>
            <div className="grid grid-cols-8 gap-1 mt-6 mb-2">
                <div className="bg-gray-200 p-2 font-semibold col-span-8 rounded-md flex items-center">
                    {icon}
                    <span className="ml-2">{sessionTitle}</span>
                </div>
            </div>

            {timeSlots.map((time, index) => (
                <div key={time} className="grid grid-cols-8 gap-1 mb-1">
                    <div className="bg-green-600 p-2 flex items-center justify-center text-white">{time}</div>

                    {daysOfWeek.map((day) => {
                        const appointment = getAppointment(day.dayNumber, time)
                        return (
                            <div
                                key={`${day.dayNumber}-${time}`}
                                className={`p-2 rounded-md ${appointment ? "bg-blue-50 border border-blue-200" : "bg-gray-100"}`}
                            >
                                {appointment && (
                                    <div className="text-xs">
                                        <div className="font-semibold flex items-center">
                                            <User className="h-3 w-3 mr-1" />
                                            {appointment.patientName}
                                        </div>
                                        <div className="text-gray-600 flex items-center">
                                            <FileText className="h-3 w-3 mr-1" />
                                            {appointment.patientId}
                                        </div>
                                        <div className="text-gray-600 flex items-center">
                                            <Phone className="h-3 w-3 mr-1" />
                                            {appointment.phone}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ))}
        </>
    )
    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />
                <main className="p-6 overflow-auto h-full ">
                    <div className="flex space-x-6 bg-white rounded-xl shadow-sm">
                        <div className="container mx-auto ">
                            <h1 className="text-2xl font-bold mb-6">Lịch Sử Cuộc Hẹn</h1>

                            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative flex items-center">
                                    <Search className="absolute left-3 h-5 w-5 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border rounded-md pl-10 pr-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="min-w-[900px] mb-10">
                                    <div className="grid grid-cols-8 gap-1 mb-1">
                                        <div className="bg-green-600 p-2 text-white font-semibold rounded-tl-md items-center cl justify-center flex">
                                            <Clock className="h-5 w-5 inline-block mr-1" />
                                            Giờ
                                        </div>
                                        {daysOfWeek.map((day) => (
                                            <div key={day.dayNumber} className="bg-blue-500 p-2 font-semibold text-white  text-center">
                                                {day.name}
                                                <div className="text-xs text-black-500">{day.date}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {renderTimeSlots(morningTimeSlots, "Buổi Sáng (7:30 - 11:30)", <Sun className="h-5 w-5 text-amber-500" />)}

                                    {renderTimeSlots(
                                        afternoonTimeSlots,
                                        "Buổi Chiều (13:30 - 16:00)",
                                        <Moon className="h-5 w-5 text-indigo-500" />,
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AppointmentSchedule
