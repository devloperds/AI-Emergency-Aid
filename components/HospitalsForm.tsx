import React, { useState } from 'react';
import { Hospital } from '../types';

interface HospitalsFormProps {
  initialHospitals: Hospital[];
  onSave: (hospitals: Hospital[]) => void;
  onCancel: () => void;
}

const HospitalsForm: React.FC<HospitalsFormProps> = ({ initialHospitals, onSave, onCancel }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);

  const handleHospitalChange = (index: number, field: keyof Hospital, value: string) => {
    const updatedHospitals = [...hospitals];
    updatedHospitals[index] = { ...updatedHospitals[index], [field]: value };
    setHospitals(updatedHospitals);
  };

  const addHospital = () => {
    const newHospital: Hospital = {
      id: Date.now().toString(),
      name: '',
      address: '',
    };
    setHospitals([...hospitals, newHospital]);
  };

  const removeHospital = (index: number) => {
    const updatedHospitals = hospitals.filter((_, i) => i !== index);
    setHospitals(updatedHospitals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(hospitals);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">Edit Hospitals</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Preferred Hospitals
              </label>
              <button
                type="button"
                onClick={addHospital}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Add Hospital
              </button>
            </div>
            
            {hospitals.map((hospital, index) => (
              <div key={hospital.id} className="bg-slate-700 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-400">Hospital {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeHospital(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Hospital Name"
                    value={hospital.name}
                    onChange={(e) => handleHospitalChange(index, 'name', e.target.value)}
                    className="w-full p-3 bg-slate-600 border border-slate-500 rounded text-slate-100"
                    required
                  />
                  <textarea
                    placeholder="Hospital Address"
                    value={hospital.address}
                    onChange={(e) => handleHospitalChange(index, 'address', e.target.value)}
                    className="w-full p-3 bg-slate-600 border border-slate-500 rounded text-slate-100 h-20"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Save Hospitals
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalsForm;
