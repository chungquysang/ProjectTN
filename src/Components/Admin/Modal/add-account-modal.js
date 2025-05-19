// AddAccountModal.jsx
import React, { useState } from "react";

function AddAccount({ onClose, onSave }) {
    const [user, setUser] = useState({ name: "", email: "", role: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Account</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {["name", "email", "role"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                value={user[field]}
                                onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                                required
                            />
                        </div>
                    ))}
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddAccount