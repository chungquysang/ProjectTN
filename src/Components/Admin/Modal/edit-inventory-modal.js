// "use client";

// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { getMedicine } from "../../../services/API/Medicine";
// function EditInventory({ onClose }) {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     quantity: "",
//     importDate: "",
//     expiryDate: "",
//   });

//   const [errors, setErrors] = useState({});

//   // useEffect(() => {
//   //   if (inventory) {
//   //     setFormData({
//   //       id: inventory.id,
//   //       name: inventory.name || "",
//   //       quantity: inventory.quantity || "",
//   //       importDate: formatDateForInput(inventory.importDate) || "",
//   //       expiryDate: formatDateForInput(inventory.expiryDate) || "",
//   //     });
//   //   }
//   // }, [inventory]);

//   // Helper to format date from DD/MM/YYYY to YYYY-MM-DD for input
//   // const formatDateForInput = (dateString) => {
//   //   if (!dateString) return "";

//   //   const parts = dateString.split("/");
//   //   if (parts.length !== 3) return "";

//   //   return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
//   //     2,
//   //     "0"
//   //   )}`;
//   // };

//   // Helper to format date from YYYY-MM-DD to DD/MM/YYYY for display
//   // const formatDateForDisplay = (dateString) => {
//   //   if (!dateString) return "";

//   //   const date = new Date(dateString);
//   //   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   // };

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value,
//   //   });

//   //   // Clear error for this field
//   //   if (errors[name]) {
//   //     setErrors({
//   //       ...errors,
//   //       [name]: "",
//   //     });
//   //   }
//   // };

//   // const validateForm = () => {
//   //   const newErrors = {};

//   //   if (!formData.name) newErrors.name = "Vui lòng chọn thuốc";
//   //   if (!formData.quantity) newErrors.quantity = "Vui lòng nhập số lượng";
//   //   if (!formData.importDate) newErrors.importDate = "Vui lòng chọn ngày nhập";
//   //   if (!formData.expiryDate)
//   //     newErrors.expiryDate = "Vui lòng chọn hạn sử dụng";

//   //   // Validate expiry date is after import date
//   //   if (formData.importDate && formData.expiryDate) {
//   //     const importDate = new Date(formData.importDate);
//   //     const expiryDate = new Date(formData.expiryDate);
//   //     if (expiryDate <= importDate) {
//   //       newErrors.expiryDate = "Hạn sử dụng phải sau ngày nhập";
//   //     }
//   //   }

//   //   setErrors(newErrors);
//   //   return Object.keys(newErrors).length === 0;
//   // };

//   // const handleSubmit = () => {
//   //   if (validateForm()) {
//   //     onUpdate({
//   //       ...formData,
//   //       importDate: formatDateForDisplay(formData.importDate),
//   //       expiryDate: formatDateForDisplay(formData.expiryDate),
//   //     });
//   //   }
//   // };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" onClick={onClose}>
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>

//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="absolute top-0 right-0 pt-4 pr-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-500 focus:outline-none"
//             >
//               <X size={20} />
//             </button>
//           </div>
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                   Sửa thông tin kho
//                 </h3>
//                 <div className="mt-2 space-y-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Tên thuốc<span className="text-red-500">*</span>
//                     </label>
//                     {/* <select
//                       id="name"
//                       name="name"
//                       className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                       value={formData.name}
//                       onChange={handleChange}
//                       autoFocus
//                     >
//                       <option value="">Chọn thuốc</option>
//                       {medicines.map((medicine) => (
//                         <option key={medicine.id} value={medicine.name}>
//                           {medicine.name}
//                         </option>
//                       ))}
//                     </select> */}
//                     {errors.name && (
//                       <p className="mt-1 text-sm text-red-500">{errors.name}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="quantity"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Số lượng<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       id="quantity"
//                       name="quantity"
//                       placeholder="0"
//                       min="1"
//                       className={`w-full px-3 py-2 border ${errors.quantity ? "border-red-500" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                       value={formData.quantity}
//                     // onChange={handleChange}
//                     />
//                     {errors.quantity && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {errors.quantity}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="importDate"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Ngày nhập<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       id="importDate"
//                       name="importDate"
//                       className={`w-full px-3 py-2 border ${errors.importDate ? "border-red-500" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                       value={formData.importDate}
//                     // onChange={handleChange}
//                     />
//                     {errors.importDate && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {errors.importDate}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="expiryDate"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Hạn sử dụng<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       id="expiryDate"
//                       name="expiryDate"
//                       min={formData.importDate}
//                       className={`w-full px-3 py-2 border ${errors.expiryDate ? "border-red-500" : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                       value={formData.expiryDate}
//                     // onChange={handleChange}
//                     />
//                     {errors.expiryDate && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {errors.expiryDate}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//             // onClick={handleSubmit}
//             >
//               Cập nhật
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//             >
//               Hủy
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default EditInventory