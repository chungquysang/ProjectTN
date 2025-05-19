"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getDosage } from "../../../services/API/DosageMedicine";
import { getCategory } from "../../../services/API/MedicineCategory";
import { loadAvatarMedicine, updateMedicine, uploadAvatarMedicine } from "../../../services/API/Medicine";
import { img } from "framer-motion/client";

export default function EditMedicine({ medicine, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    dosageForm: "",
    price: "",
    status: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [dosageForms, setDosageForms] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoryRes, dosageRes] = await Promise.all([
          getCategory(),
          getDosage(),
        ]);
        if (categoryRes) setCategories(categoryRes);
        if (dosageRes) setDosageForms(dosageRes);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu danh mục hoặc dạng bào chế:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (medicine && categories.length > 0 && dosageForms.length > 0) {
      const foundCategory = categories.find(
        (c) => c.medicineCategoryName === medicine.medicineCategoryName
      );
      const foundDosage = dosageForms.find(
        (d) => d.dosageFormName === medicine.dosageFormName
      );

      setFormData({
        id: medicine.medicineId,
        name: medicine.medicineName || "",
        category: foundCategory?.medicineCategoryId || "",
        dosageForm: foundDosage?.dosageFormId || "",
        price: medicine.medicinePrice || "",
        status: medicine.medicineStatus || "",
        image: null,
      });
    }
  }, [medicine, categories, dosageForms]);

  useEffect(() => {
    // console.log("medicine.image:", medicine.medicineAvatar);
    const fetchImage = async () => {
      if (
        medicine?.medicineAvatar &&
        medicine.medicineAvatar !== "null" &&
        medicine.medicineAvatar !== null &&
        medicine.medicineId
      ) {
        const imageUrl = await loadAvatarMedicine(medicine.medicineId);
        setImagePreview(imageUrl);
      } else {
        setImagePreview(null);
      }
    };

    fetchImage();
  }, [medicine]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên thuốc";
    if (!formData.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!formData.dosageForm) newErrors.dosageForm = "Vui lòng chọn dạng bào chế";
    if (!formData.price) newErrors.price = "Vui lòng nhập đơn giá";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadMedicineImage = async (medicineId, imageFile) => {
    if (!(imageFile instanceof File)) return;

    const formImage = new FormData();
    formImage.append("file", imageFile);

    try {
      await uploadAvatarMedicine(medicineId, formImage);
    } catch (error) {
      console.warn("Upload ảnh thất bại:", error);
      throw error; // ném lại lỗi để xử lý ở chỗ gọi
    }
  };


  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const { name, category, dosageForm, price, status, image } = formData;
      console.log("img", img)
      const payload = {
        medicineName: name,
        medicineCategory_id: category,
        dosage_form_id: dosageForm,
        medicinePrice: price,
        medicineStatus: status,
        medicineAvatar: "",
      };
      await updateMedicine(medicine.medicineId, payload);
      if (image) {
        await uploadMedicineImage(medicine.medicineId, image);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật thuốc:", error);
      alert("Có lỗi xảy ra khi cập nhật thuốc!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Sửa thông tin thuốc
                </h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-full">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Ảnh thuốc"
                          className="h-32 w-32 object-cover rounded-md mb-4"
                        />
                      ) : (
                        <div className="text-gray-400 mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-24 w-24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}

                      <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors">
                        Thay đổi ảnh
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-1 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tên thuốc<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên thuốc"
                        className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.name}
                        onChange={handleChange}
                        autoFocus
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Danh mục<span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        className={`w-full px-3 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                          <option
                            key={category.medicineCategoryId}
                            value={category.medicineCategoryId}
                          >
                            {category.medicineCategoryName}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="dosageForm"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Dạng bào chế<span className="text-red-500">*</span>
                      </label>
                      <select
                        id="dosageForm"
                        name="dosageForm"
                        className={`w-full px-3 py-2 border ${errors.dosageForm ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.dosageForm}
                        onChange={handleChange}
                      >
                        <option value="">Chọn dạng bào chế</option>
                        {dosageForms.map((form) => (
                          <option key={form.dosageFormId} value={form.dosageFormId}>
                            {form.dosageFormName}
                          </option>
                        ))}
                      </select>
                      {errors.dosageForm && (
                        <p className="mt-1 text-sm text-red-500">{errors.dosageForm}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Đơn giá<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0"
                        className={`w-full px-3 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.price}
                        onChange={handleChange}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Trạng thái
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Đang bán">Đang bán</option>
                        <option value="Ngưng bán">Ngưng bán</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
