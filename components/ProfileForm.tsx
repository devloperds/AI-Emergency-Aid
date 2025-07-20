import React, { useState } from 'react';
import { UserProfile, EmergencyContact } from '../types';

interface ProfileFormProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile, onSave, onCancel }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
    const updatedContacts = [...profile.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setProfile({ ...profile, emergencyContacts: updatedContacts });
  };

  const addContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: '',
      phone: '',
      email: '',
    };
    setProfile({ ...profile, emergencyContacts: [...profile.emergencyContacts, newContact] });
  };

  const removeContact = (index: number) => {
    const updatedContacts = profile.emergencyContacts.filter((_, i) => i !== index);
    setProfile({ ...profile, emergencyContacts: updatedContacts });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Address
            </label>
            <textarea
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500 h-20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Medical Information
            </label>
            <textarea
              value={profile.medicalInfo}
              onChange={(e) => setProfile({ ...profile, medicalInfo: e.target.value })}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Allergies, medical conditions, medications, etc."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Emergency Contacts
              </label>
              <button
                type="button"
                onClick={addContact}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Add Contact
              </button>
            </div>
            
            {profile.emergencyContacts.map((contact, index) => (
              <div key={contact.id} className="bg-slate-700 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-400">Contact {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeContact(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                    className="p-2 bg-slate-600 border border-slate-500 rounded text-slate-100 text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                    className="p-2 bg-slate-600 border border-slate-500 rounded text-slate-100 text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                    className="p-2 bg-slate-600 border border-slate-500 rounded text-slate-100 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Save Profile
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

export default ProfileForm;
