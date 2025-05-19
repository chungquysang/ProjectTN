import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MedCare Hospital</h3>
            <p className="text-blue-100 mb-4">
              Chăm sóc sức khỏe chất lượng cao, với đội ngũ y bác sĩ giàu kinh
              nghiệm và trang thiết bị hiện đại.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Đường Sức Khỏe, Quận Y Tế, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>contact@medcare.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <span>Thứ 2 - Chủ nhật: 7:00 - 20:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              {[
                "Khám tổng quát",
                "Khám chuyên khoa",
                "Xét nghiệm",
                "Chẩn đoán hình ảnh",
                "Tư vấn dinh dưỡng",
                "Tiêm chủng",
              ].map((service) => (
                <li key={service}>
                  <button
                    className="text-left w-full text-blue-100 hover:text-white transition-colors"
                    onClick={() => {}}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Truy cập nhanh</h3>
            <ul className="space-y-2">
              {[
                "Trang chủ",
                "Đội ngũ bác sĩ",
                "Lịch khám",
                "Tin tức y tế",
                "Về chúng tôi",
                "Liên hệ",
              ].map((link) => (
                <li key={link}>
                  <button
                    className="text-left w-full text-blue-100 hover:text-white transition-colors"
                    onClick={() => {}}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-200">
          <p>
            &copy; {new Date().getFullYear()} MedCare Hospital. Tất cả quyền
            được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
