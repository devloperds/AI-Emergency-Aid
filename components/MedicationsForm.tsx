import React, { useState } from 'react';
import { Medication } from '../types';

interface MedicationsFormProps {
  initialMedications: Medication[];
  onSave: (medications: Medication[]) => void;
  onCancel: () => void;
}

const MedicationsForm: React.FC<MedicationsFormProps> = ({ initialMedications, onSave, onCancel }) => {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      schedule: '',
    };
    setMedications([...medications, newMedication]);
  };

  const removeMedication = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(medications);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-purple-400 mb-6">Edit Medications</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Current Medications
              </label>
              <button
                type="button"
                onClick={addMedication}
                className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
              >
                Add Medication
              </button>
            </div>
            
            {medications.map((medication, index) => (
              <div key={medication.id} className="bg-slate-700 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-400">Medication {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Medication Name"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    className="w-full p-3 bg-slate-600 border border-slate-500 rounded text-slate-100"
                    required
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 10mg)"
                      value={medication.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      className="p-3 bg-slate-600 border border-slate-500 rounded text-slate-100"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Schedule (e.g., Twice daily)"
                      value={medication.schedule}
                      onChange={(e) => handleMedicationChange(index, 'schedule', e.target.value)}
                      className="p-3 bg-slate-600 border border-slate-500 rounded text-slate-100"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Save Medications
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

export default MedicationsForm;
