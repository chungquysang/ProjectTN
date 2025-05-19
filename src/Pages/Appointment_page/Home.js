import React, { useEffect } from "react";
import { Footer, Header } from "../../Components/Appointment/controllerRouter";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  ChevronRightIcon,
} from "lucide-react";

const Home = () => {
  // Function to handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Select all sections that should animate on scroll
    document.querySelectorAll(".animate-on-scroll").forEach((section) => {
      section.classList.add("opacity-0");
      observer.observe(section);
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Specialties data
  const specialties = [
    {
      name: "Nội tổng quát",
      description:
        "Khám, chẩn đoán và điều trị các bệnh lý nội khoa thông thường và mãn tính.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Nhi khoa",
      description:
        "Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Tai-mũi-họng",
      description:
        "Chẩn đoán và điều trị các bệnh lý về tai, mũi, họng và đầu cổ.",
      image:
        "https://images.unsplash.com/photo-1589279003513-467d320f47eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Tim mạch",
      description:
        "Chẩn đoán và điều trị các bệnh lý tim mạch từ đơn giản đến phức tạp.",
      image:
        "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Thần kinh",
      description:
        "Điều trị các rối loạn của hệ thống thần kinh, bao gồm não, tủy sống và dây thần kinh.",
      image:
        "https://images.unsplash.com/photo-1559757175-7cb056abe917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Mắt",
      description:
        "Khám và điều trị các vấn đề về mắt, từ kiểm tra thị lực đến phẫu thuật phức tạp.",
      image:
        "https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Features data
  const features = [
    {
      icon: <UserIcon size={28} className="text-white" />,
      title: "Đội ngũ chuyên nghiệp",
      description:
        "Các bác sĩ và nhân viên y tế của chúng tôi đều được đào tạo bài bản và có nhiều năm kinh nghiệm.",
    },
    {
      icon: <ClockIcon size={28} className="text-white" />,
      title: "Tiết kiệm thời gian",
      description:
        "Đăng ký khám bệnh trực tuyến, giảm thời gian chờ đợi và thủ tục hành chính.",
    },
    {
      icon: <CalendarIcon size={28} className="text-white" />,
      title: "Lịch khám linh hoạt",
      description: "Chọn ngày giờ khám phù hợp với lịch trình cá nhân của bạn.",
    },
    {
      icon: <PhoneIcon size={28} className="text-white" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.",
    },
  ];

  // Button component for consistency
  const PrimaryButton = ({ to, children, className }) => (
    <Link
      to={to}
      className={`px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md ${className}`}
    >
      {children}
    </Link>
  );

  const SecondaryButton = ({ to, children, className }) => (
    <Link
      to={to}
      className={`px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${className}`}
    >
      {children}
    </Link>
  );

  return (
    <div className="w-full font-sans text-gray-800 bg-white">
      <Header />

      {/* Hero Section - Enhanced with subtle animation */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Chăm sóc sức khỏe{" "}
              <span className="text-blue-200">chất lượng cao</span> cho mọi
              người
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed max-w-lg">
              Đội ngũ y bác sĩ giàu kinh nghiệm cùng trang thiết bị hiện đại,
              chúng tôi cam kết mang đến dịch vụ y tế tốt nhất cho bạn và gia
              đình.
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton
                to="/register"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Đăng ký ngay
              </PrimaryButton>
              <SecondaryButton to="/login">Đăng nhập</SecondaryButton>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in animation-delay-200">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Bác sĩ với bệnh nhân"
                className="rounded-2xl shadow-2xl max-w-full h-auto object-cover"
                loading="eager"
                width="600"
                height="400"
              />
              <div className="absolute -bottom-4 -right-4 bg-white text-blue-700 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Đang tiếp nhận đặt lịch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave effect at the bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section - With scroll animation */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn chúng tôi?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết cung cấp dịch vụ chăm sóc sức khỏe chất lượng
              cao, thuận tiện và dễ tiếp cận cho tất cả mọi người.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - New */}
      <section className="py-16 bg-blue-700 text-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">30+</div>
              <p className="text-blue-200">Bác sĩ chuyên khoa</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10k+</div>
              <p className="text-blue-200">Bệnh nhân hài lòng</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-blue-200">Năm kinh nghiệm</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-200">Hỗ trợ khẩn cấp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments/Specialties Section - With interactive cards */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Chuyên khoa</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Chúng tôi cung cấp nhiều dịch vụ y tế chuyên khoa để đáp ứng nhu
              cầu chăm sóc sức khỏe đa dạng cho bạn và gia đình.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.slice(0, 6).map((specialty, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <p className="text-white font-medium">Đặt lịch ngay</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {specialty.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{specialty.description}</p>
                  <Link
                    to="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Tìm hiểu thêm{" "}
                    <ChevronRightIcon size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <PrimaryButton to="/" className="inline-block">
              Xem tất cả chuyên khoa
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Bệnh nhân nói gì về chúng tôi?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sự hài lòng của bệnh nhân luôn là ưu tiên hàng đầu của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-200 absolute top-4 right-4"
              >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Tôi rất hài lòng với dịch vụ khám chữa bệnh tại đây. Bác sĩ tận
                tình tư vấn, nhân viên nhiệt tình và không phải chờ đợi lâu."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">NT</span>
                </div>
                <div>
                  <h4 className="font-semibold">Nguyễn Thị Anh</h4>
                  <p className="text-gray-500 text-sm">
                    Bệnh nhân khoa Tim mạch
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-200 absolute top-4 right-4"
              >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Phòng khám có quy trình đăng ký trực tuyến rất thuận tiện. Tôi
                có thể lựa chọn thời gian phù hợp và không phải xếp hàng chờ
                đợi."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">TM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Trần Minh Đức</h4>
                  <p className="text-gray-500 text-sm">
                    Bệnh nhân khoa Nội tổng quát
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-200 absolute top-4 right-4"
              >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Con trai tôi được chăm sóc rất tốt tại khoa Nhi. Bác sĩ giải
                thích rõ ràng về tình trạng bệnh và cách điều trị, giúp tôi yên
                tâm hơn."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">LH</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lê Hoàng Mai</h4>
                  <p className="text-gray-500 text-sm">
                    Phụ huynh bệnh nhân khoa Nhi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-blue-800 to-blue-700 text-white relative overflow-hidden animate-on-scroll">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full"
            >
              <path
                fill="rgba(255,255,255,0.1)"
                fill-opacity="1"
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bắt đầu đăng ký khám bệnh ngay hôm nay
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Chỉ với vài bước đơn giản, bạn có thể đặt lịch khám với bác sĩ
            chuyên khoa phù hợp. Không cần xếp hàng chờ đợi, tiết kiệm thời gian
            và công sức.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <PrimaryButton
              to="/register"
              className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              Đăng ký ngay
            </PrimaryButton>
            <SecondaryButton to="/login" className="px-8 py-4 text-lg">
              Đăng nhập
            </SecondaryButton>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đăng ký tài khoản</h3>
              <p className="text-blue-100">
                Tạo tài khoản cá nhân với thông tin của bạn
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chọn bác sĩ</h3>
              <p className="text-blue-100">
                Lựa chọn bác sĩ chuyên khoa phù hợp với nhu cầu
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đặt lịch khám</h3>
              <p className="text-blue-100">
                Chọn ngày giờ phù hợp và hoàn tất đặt lịch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section - New */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">Tải ứng dụng di động</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Trải nghiệm đặt lịch khám bệnh dễ dàng hơn với ứng dụng di động.
                Theo dõi lịch hẹn, nhận thông báo và quản lý hồ sơ sức khỏe mọi
                lúc mọi nơi.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/" className="inline-block">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                    alt="App Store"
                    className="h-12"
                  />
                </a>
                <a href="/" className="inline-block">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png"
                    alt="Google Play"
                    className="h-12"
                  />
                </a>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-100 rounded-full opacity-70"></div>
                <div className="absolute -top-4 -right-4 w-40 h-40 bg-blue-200 rounded-full opacity-70"></div>
                <img
                  src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  alt="Mobile App"
                  className="relative z-10 rounded-2xl shadow-xl"
                  width="400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - New */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Câu hỏi thường gặp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Giải đáp những thắc mắc phổ biến về dịch vụ khám chữa bệnh của
              chúng tôi.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Làm thế nào để đặt lịch khám?
              </h3>
              <p className="text-gray-600">
                Bạn cần đăng ký tài khoản trên hệ thống, sau đó chọn chuyên
                khoa, bác sĩ và thời gian phù hợp. Hệ thống sẽ xác nhận lịch hẹn
                qua email hoặc tin nhắn.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Tôi có thể hủy hoặc đổi lịch hẹn không?
              </h3>
              <p className="text-gray-600">
                Có, bạn có thể hủy hoặc đổi lịch hẹn ít nhất 24 giờ trước thời
                gian đã đặt. Vui lòng đăng nhập vào tài khoản và thực hiện thay
                đổi hoặc liên hệ tổng đài hỗ trợ.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Các hình thức thanh toán được chấp nhận?
              </h3>
              <p className="text-gray-600">
                Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ ngân hàng,
                chuyển khoản và các ví điện tử phổ biến như MoMo, ZaloPay,
                VNPay.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Bảo hiểm y tế có được áp dụng không?
              </h3>
              <p className="text-gray-600">
                Có, chúng tôi có liên kết với nhiều công ty bảo hiểm y tế. Vui
                lòng mang theo thẻ bảo hiểm khi đến khám và kiểm tra điều kiện
                áp dụng trước với tư vấn viên.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Add global styles */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default Home;
