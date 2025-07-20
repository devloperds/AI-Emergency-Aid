import React, { useState, useEffect } from 'react';
import { UserProfile, Hospital, Medication } from '../types';

interface EmergencyFlowProps {
  userProfile: UserProfile;
  hospitals: Hospital[];
  medications: Medication[];
  isSilent: boolean;
  onComplete: () => void;
}

const EmergencyFlow: React.FC<EmergencyFlowProps> = ({
  userProfile,
  hospitals,
  medications,
  isSilent,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Auto-advance after showing emergency initiated message
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSymptomSubmit = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const handleCallEmergency = () => {
    // In a real app, this would trigger actual emergency services
    alert('Emergency services have been notified!');
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              {isSilent ? 'Silent Emergency Activated' : 'Emergency SOS Activated'}
            </h2>
            <p className="text-slate-300">
              {isSilent 
                ? 'Emergency contacts will be notified discreetly...'
                : 'Emergency services are being contacted...'
              }
            </p>
            <div className="animate-pulse mt-4">
              <div className="h-2 bg-red-600 rounded"></div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-6 text-center">
              Describe Your Emergency
            </h2>
            <div className="space-y-4">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms or emergency situation..."
                className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 h-32 resize-none"
                autoFocus
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSymptomSubmit}
                  disabled={!symptoms.trim() || isProcessing}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Analyzing...' : 'Submit'}
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-6 text-center">
              Emergency Analysis
            </h2>
            <div className="bg-slate-700 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Severity Assessment: Moderate</h3>
              <p className="text-slate-300 mb-4">
                Based on your symptoms, this appears to be a moderate emergency requiring immediate medical attention.
              </p>
              <p className="text-slate-300 mb-4">
                <strong>Recommended Department:</strong> Emergency Room
              </p>
              <p className="text-slate-300">
                <strong>Nearest Hospital:</strong> {hospitals[0]?.name || 'No hospitals configured'}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCallEmergency}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                📞 Call Emergency Services
              </button>
              <button
                onClick={() => setStep(4)}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-6 text-center">
              Emergency Information
            </h2>
            <div className="space-y-6">
              {/* User Info */}
              <div className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Personal Information</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {userProfile.name}</p>
                  <p><strong>Address:</strong> {userProfile.address}</p>
                  <p><strong>Medical Info:</strong> {userProfile.medicalInfo}</p>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Emergency Contacts</h3>
                <div className="space-y-2 text-sm">
                  {userProfile.emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex justify-between">
                      <span>{contact.name}</span>
                      <span className="text-slate-400">{contact.phone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Current Medications</h3>
                <div className="space-y-2 text-sm">
                  {medications.map((med) => (
                    <div key={med.id}>
                      <span className="font-medium">{med.name}</span>
                      <span className="text-slate-400 ml-2">({med.dosage})</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onComplete}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-red-500">
        {renderStep()}
      </div>
    </div>
  );
};

export default EmergencyFlow;
