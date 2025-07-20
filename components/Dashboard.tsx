import React from 'react';
import { UserProfile, Hospital, Medication } from '../types';

interface DashboardProps {
  userProfile: UserProfile;
  hospitals: Hospital[];
  medications: Medication[];
  onTriggerSOS: (isSilent: boolean) => void;
  onEditProfile: () => void;
  onEditHospitals: () => void;
  onEditMedications: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userProfile,
  hospitals,
  medications,
  onTriggerSOS,
  onEditProfile,
  onEditHospitals,
  onEditMedications,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* SOS Buttons */}
      <div className="md:col-span-2">
        <div className="grid gap-4 md:grid-cols-2">
          <button
            onClick={() => onTriggerSOS(false)}
            className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-8 px-6 rounded-lg transition-colors shadow-lg"
          >
            🚨 EMERGENCY SOS
          </button>
          <button
            onClick={() => onTriggerSOS(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-8 px-6 rounded-lg transition-colors shadow-lg"
          >
            🔇 SILENT SOS
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-400">Profile</h2>
          <button
            onClick={onEditProfile}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-400">Name:</span> {userProfile.name}</p>
          <p><span className="text-slate-400">Address:</span> {userProfile.address}</p>
          <p><span className="text-slate-400">Medical Info:</span> {userProfile.medicalInfo}</p>
          <p><span className="text-slate-400">Emergency Contacts:</span> {userProfile.emergencyContacts.length}</p>
        </div>
      </div>

      {/* Hospitals Card */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-400">Hospitals</h2>
          <button
            onClick={onEditHospitals}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2 text-sm">
          {hospitals.slice(0, 3).map((hospital) => (
            <p key={hospital.id} className="truncate">
              <span className="text-slate-400">•</span> {hospital.name}
            </p>
          ))}
          {hospitals.length > 3 && (
            <p className="text-slate-400 text-xs">+ {hospitals.length - 3} more...</p>
          )}
        </div>
      </div>

      {/* Medications Card */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-400">Medications</h2>
          <button
            onClick={onEditMedications}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Edit
          </button>
        </div>
        <div className="grid gap-2 md:grid-cols-2 text-sm">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-slate-700 p-3 rounded">
              <p className="font-medium">{medication.name}</p>
              <p className="text-slate-400 text-xs">{medication.dosage} - {medication.schedule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
