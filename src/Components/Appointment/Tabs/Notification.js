import React from "react";

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Nhắc lịch khám",
      message: "Bạn có lịch khám vào ngày 15/06 lúc 09:30.",
      date: "2023-06-14 08:00",
    },
    {
      id: 2,
      title: "Kết quả xét nghiệm",
      message: "Kết quả xét nghiệm máu đã sẵn sàng.",
      date: "2023-06-13 10:00",
    },
  ];

  return (
    <div className="space-y-3">
      {notifications.map((noti) => (
        <div key={noti.id} className="border p-3 rounded-xl shadow-md">
          <h3 className="font-bold text-base">{noti.title}</h3>
          <p className="text-sm text-gray-600">{noti.message}</p>
          <p className="text-xs text-gray-400 text-right">{noti.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
