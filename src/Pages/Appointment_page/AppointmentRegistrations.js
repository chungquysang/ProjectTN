"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  X,
  Send,
  Phone,
  Stethoscope,
  FileText,
  Clock,
  CalendarDays,
  ChevronRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

function AppointmentRegistration() {
  const navigate = useNavigate();
  // Removed unused isVisible state
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const userProfile = {
    fullName: "Nguyễn Văn Cường",
    email: "cuong.nguyen@example.com",
    phoneNumber: "0987654321",
    dateOfBirth: "1985-05-15",
    gender: "male",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    citizenId: "079123456789",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    address: "",
    specialty: "",
    appointmentSession: "",
    appointmentDate: "",
    symptoms: "",
    citizenId: "",
    emergencyContact: "",
    previousMedicalHistory: "",
    currentMedications: "",
    allergies: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        fullName: userProfile.fullName,
        email: userProfile.email,
        dateOfBirth: userProfile.dateOfBirth,
        phoneNumber: userProfile.phoneNumber,
        gender: userProfile.gender,
        address: userProfile.address,
        citizenId: userProfile.citizenId,
      }));
      setIsLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name);
  };

  const validateField = (fieldName) => {
    const newErrors = {};
    switch (fieldName) {
      case "specialty":
        if (!formData.specialty)
          newErrors.specialty = "Vui lòng chọn chuyên khoa";
        break;
      case "appointmentDate":
        if (!formData.appointmentDate)
          newErrors.appointmentDate = "Vui lòng chọn ngày khám";
        break;
      case "appointmentSession":
        if (!formData.appointmentSession)
          newErrors.appointmentSession = "Vui lòng chọn buổi khám";
        break;
      case "symptoms":
        if (!formData.symptoms.trim())
          newErrors.symptoms = "Vui lòng nhập triệu chứng";
        break;
      case "emergencyContact":
        if (!formData.emergencyContact.trim())
          newErrors.emergencyContact = "Vui lòng nhập liên hệ khẩn cấp";
        break;
      default:
        // Default case added to satisfy ESLint
        break;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.specialty)
        newErrors.specialty = "Vui lòng chọn chuyên khoa";
      if (!formData.appointmentDate)
        newErrors.appointmentDate = "Vui lòng chọn ngày khám";
      if (!formData.appointmentSession)
        newErrors.appointmentSession = "Vui lòng chọn buổi khám";
    } else if (currentStep === 2) {
      if (!formData.symptoms.trim())
        newErrors.symptoms = "Vui lòng nhập triệu chứng";
      if (!formData.emergencyContact.trim())
        newErrors.emergencyContact = "Vui lòng nhập liên hệ khẩn cấp";
    }

    const stepFields =
      currentStep === 1
        ? ["specialty", "appointmentDate", "appointmentSession"]
        : ["symptoms", "emergencyContact"];

    setTouched((prev) => ({
      ...prev,
      ...stepFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
    }));

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setTimeout(() => navigate("/Home/DashboardAppointment"), 1000);
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          submit: "Đã có lỗi xảy ra. Vui lòng thử lại.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-blue-600 font-medium">Đang tải thông tin...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100 p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex justify-between items-center text-white mb-6">
            <motion.button
              onClick={() => navigate(-1)}
              className="hover:bg-blue-500/20 p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            <h1 className="text-2xl font-bold">Đăng ký khám bệnh</h1>
            <div className="w-10" />
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between relative">
            {[1, 2].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? "bg-white text-blue-600"
                        : "bg-blue-500/20 text-white"
                    }`}
                    whileHover={step >= stepNumber ? { scale: 1.1 } : {}}
                    whileTap={step >= stepNumber ? { scale: 0.9 } : {}}
                  >
                    {stepNumber === 1 ? (
                      <CalendarDays size={20} />
                    ) : (
                      <FileText size={20} />
                    )}
                  </motion.div>
                  <span className="absolute -bottom-6 text-sm text-white">
                    {stepNumber === 1 ? "Thông tin khám" : "Chi tiết"}
                  </span>
                </div>
                {stepNumber < 2 && (
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 h-1 bg-blue-500/20">
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: step > stepNumber ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <AnimatePresence mode="wait" custom={step}>
            <motion.div
              key={step}
              variants={stepVariants}
              custom={step}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="space-y-6"
            >
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chuyên khoa <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-10 py-3 border ${
                          touched.specialty && errors.specialty
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      >
                        <option value="">Chọn chuyên khoa</option>
                        <option value="general">Đa khoa</option>
                        <option value="cardiology">Tim mạch</option>
                        <option value="neurology">Thần kinh</option>
                        <option value="orthopedics">Chỉnh hình</option>
                        <option value="pediatrics">Nhi khoa</option>
                      </select>
                      <Stethoscope
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.specialty && errors.specialty && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 text-sm text-red-600"
                        >
                          {errors.specialty}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày khám <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="appointmentDate"
                        min={today}
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          touched.appointmentDate && errors.appointmentDate
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      />
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.appointmentDate && errors.appointmentDate && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 text-sm text-red-600"
                        >
                          {errors.appointmentDate}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Buổi khám <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="appointmentSession"
                        value={formData.appointmentSession}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-10 py-3 border ${
                          touched.appointmentSession &&
                          errors.appointmentSession
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      >
                        <option value="">Chọn buổi khám</option>
                        <option value="morning">
                          Buổi sáng (8:00 - 11:30)
                        </option>
                        <option value="afternoon">
                          Buổi chiều (13:30 - 16:30)
                        </option>
                      </select>
                      <Clock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.appointmentSession &&
                        errors.appointmentSession && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1.5 text-sm text-red-600"
                          >
                            {errors.appointmentSession}
                          </motion.p>
                        )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả triệu chứng <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={4}
                        placeholder="Mô tả chi tiết các triệu chứng bạn đang gặp phải"
                        className={`w-full pl-10 pr-4 py-3 border ${
                          touched.symptoms && errors.symptoms
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      />
                      <AlertCircle
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.symptoms && errors.symptoms && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 text-sm text-red-600"
                        >
                          {errors.symptoms}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Người liên hệ khẩn cấp{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tên và số điện thoại người liên hệ"
                        className={`w-full pl-10 pr-4 py-3 border ${
                          touched.emergencyContact && errors.emergencyContact
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      />
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.emergencyContact && errors.emergencyContact && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 text-sm text-red-600"
                        >
                          {errors.emergencyContact}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <AlertCircle
                        className="text-blue-500 mt-0.5 mr-2"
                        size={20}
                      />
                      <p className="text-sm text-blue-700">
                        Vui lòng kiểm tra kỹ thông tin trước khi xác nhận đăng
                        ký khám bệnh.
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Quay lại
              </motion.button>
            )}

            {step < 2 ? (
              <motion.button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tiếp tục
                <ChevronRight size={18} className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className={`ml-auto px-6 py-3 rounded-lg text-white flex items-center ${
                  isSubmitting || submitSuccess
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                whileHover={
                  !isSubmitting && !submitSuccess ? { scale: 1.02 } : {}
                }
                whileTap={
                  !isSubmitting && !submitSuccess ? { scale: 0.98 } : {}
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    <span>Đang xử lý...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle2 size={20} className="mr-2" />
                    <span>Đăng ký thành công!</span>
                  </>
                ) : (
                  <>
                    <span>Xác nhận đăng ký</span>
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AppointmentRegistration;
