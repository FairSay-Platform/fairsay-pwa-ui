import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { COMPLAINT_CATEGORIES, COMPLAINT_STEPS, IMPACT_TYPES, INITIAL_COMPLAINT_FORM_DATA } from "../utils/constants";
import api from '../services/api'

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-start gap-0 w-full">
      {COMPLAINT_STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        return (
          <div key={step.number} className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${isCompleted ? "bg-[#0F766E] text-white" : isActive ? "bg-[#1E3A8A] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 text-center leading-tight max-w-[54px]
                  ${isActive ? "text-[#1E3A8A] font-semibold" : isCompleted ? "text-[#0F766E] font-medium" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>
            {idx < COMPLAINT_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mt-4 mx-1 transition-all
                  ${isCompleted ? "bg-[#0F766E]" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ data, onChange }) {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-1 font-poppins">
        Basic Information
      </h2>
      <p className="text-gray-500 text-xs mb-5">Tell us what type of violation occurred</p>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">
          Complaint Category <span className="text-red-500">*</span>
        </label>
        <select
          value={data.violationCategory}
          onChange={(e) => onChange({ violationCategory: e.target.value })}
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-gray-700"
        >
          <option value="">Select a category</option>
          {COMPLAINT_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">
          Complaint Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.complaintTitle}
          onChange={(e) => onChange({ complaintTitle: e.target.value })}
          placeholder="Brief summary of the violation (e.g., 'Denied overtime pay for weekend work')"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400"
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">
          Detailed Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.detailedDescription}
          onChange={(e) => onChange({ detailedDescription: e.target.value })}
          placeholder="Provide a detailed account of what happened. Include relevant dates, times, locations, and specific actions..."
          rows={6}
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400 resize-none"
        />
        <div className="flex items-center justify-between mt-1">
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <span>↓</span> Be as specific as possible. Good documentation strengthens your case.
          </p>
          <span className="text-[11px] text-gray-400">{data.detailedDescription.length}/50 minimum</span>
        </div>
      </div>
    </div>
  );
}

function Step2({ data, onChange }) {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-1 font-poppins">
        Incident Details
      </h2>
      <p className="text-gray-500 text-xs mb-5">When and where did this violation occur?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1.5">
            Date of Incident <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path d="M12.6667 2.66669H3.33333C2.59695 2.66669 2 3.26364 2 4.00002V13.3334C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3334V4.00002C14 3.26364 13.403 2.66669 12.6667 2.66669Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.6667 1.33331V3.99998" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.33333 1.33331V3.99998" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 6.66669H14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="date"
              value={data.dateOfIncident}
              onChange={(e) => onChange({ dateOfIncident: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-gray-700"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1.5">
            Time of Incident <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 4.66669V8.00002L10.6667 9.33335" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="time"
              value={data.timeOfIncident}
              onChange={(e) => onChange({ timeOfIncident: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">
          Location <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <path d="M14 6.66669C14 11.3334 8 15.3334 8 15.3334C8 15.3334 2 11.3334 2 6.66669C2 5.07539 2.63214 3.54926 3.75736 2.42405C4.88258 1.29883 6.4087 0.666687 8 0.666687C9.5913 0.666687 11.1174 1.29883 12.2426 2.42405C13.3679 3.54926 14 5.07539 14 6.66669Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 8.66669C9.10457 8.66669 10 7.77126 10 6.66669C10 5.56212 9.10457 4.66669 8 4.66669C6.89543 4.66669 6 5.56212 6 6.66669C6 7.77126 6.89543 8.66669 8 8.66669Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g., Main office - 3rd floor conference room, Construction site B"
            className="w-full pl-9 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400"
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={data.isOngoing}
          onChange={(e) => onChange({ isOngoing: e.target.checked })}
          className="w-3.5 h-3.5 mt-0.5 rounded border-gray-300 accent-[#1E3A8A] flex-shrink-0"
        />
        <div>
          <span className="text-xs font-semibold text-gray-800">This is an ongoing issue</span>
          <p className="text-[11px] text-gray-500 mt-0.5">Check this if the violation continues to occur or has happened multiple times</p>
        </div>
      </label>
    </div>
  );
}

function Step3({ data, onChange }) {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-1 font-poppins">
        Parties Involved
      </h2>
      <p className="text-gray-500 text-xs mb-5">Who was involved in this incident?</p>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">
          Name of Person(s) Involved <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.personsInvolved}
          onChange={(e) => onChange({ personsInvolved: e.target.value })}
          placeholder="Full name(s) of person(s) who committed the violation"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1.5">Job Title/Position</label>
          <input
            type="text"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            placeholder="e.g., Manager, Supervisor"
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1.5">Department</label>
          <input
            type="text"
            value={data.department}
            onChange={(e) => onChange({ department: e.target.value })}
            placeholder="e.g., Sales, HR, Operations"
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400"
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer mb-3.5">
        <input
          type="checkbox"
          checked={data.hasWitnesses}
          onChange={(e) => onChange({ hasWitnesses: e.target.checked })}
          className="w-3.5 h-3.5 mt-0.5 rounded border-gray-300 accent-[#1E3A8A] flex-shrink-0"
        />
        <div>
          <span className="text-xs font-semibold text-gray-800">There were witnesses present</span>
          <p className="text-[11px] text-gray-500 mt-0.5">Witnesses strengthen your complaint and may be contacted for statements</p>
        </div>
      </label>

      {data.hasWitnesses && (
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1.5">Witness Names & Contact Information</label>
          <textarea
            value={data.witnessInfo}
            onChange={(e) => onChange({ witnessInfo: e.target.value })}
            placeholder="List witness names and how to contact them (email, phone). One per line."
            rows={4}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400 resize-none"
          />
        </div>
      )}
    </div>
  );
}

function Step4({ data, onChange }) {
  const toggleImpact = (id) => {
    const current = data.impactTypes;
    if (current.includes(id)) {
      onChange({ impactTypes: current.filter((i) => i !== id) });
    } else {
      onChange({ impactTypes: [...current, id] });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onChange({ evidenceFiles: [...data.evidenceFiles, ...newFiles] });
    }
  };

  const removeFile = (indexToRemove) => {
    onChange({
      evidenceFiles: data.evidenceFiles.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-1 font-poppins">
        Impact & Evidence
      </h2>
      <p className="text-gray-500 text-xs mb-5">How has this violation affected you?</p>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-2">
          Type of Impact <span className="text-gray-400 font-normal">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {IMPACT_TYPES.map((impact) => {
            const selected = data.impactTypes.includes(impact.id);
            return (
              <label
                key={impact.id}
                className={`flex items-start gap-2.5 p-3.5 rounded-lg border cursor-pointer transition-all
                  ${selected ? "border-[#1E3A8A] bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleImpact(impact.id)}
                  className="w-3.5 h-3.5 mt-0.5 rounded border-gray-300 accent-[#1E3A8A] flex-shrink-0"
                />
                <div>
                  <span className="text-xs font-semibold text-gray-800">{impact.label}</span>
                  <p className="text-[11px] text-gray-500">{impact.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">Evidence Description</label>
        <textarea
          value={data.evidenceDescription}
          onChange={(e) => onChange({ evidenceDescription: e.target.value })}
          placeholder="Describe any evidence you have: emails, texts, photos, documents, recordings, etc."
          rows={4}
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">
          Upload Evidence <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-7 px-3.5 cursor-pointer hover:border-[#1E3A8A] hover:bg-blue-50/30 transition-all">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mb-2.5">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs text-gray-600 mb-1">
            Drag and drop files here, or{" "}
            <span className="text-[#1E3A8A] font-semibold">browse files</span>
          </span>
          <span className="text-[11px] text-gray-400">PDF, JPG, JPEG, PNG (Max 10MB each)</span>
          <input type="file" multiple className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
        </label>

        {data.evidenceFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {data.evidenceFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-100 rounded-md text-xs">
                <span className="truncate max-w-[80%] text-gray-700">{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} className="text-red-500 font-semibold hover:text-red-700">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Step5({ data, onChange }) {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-1 font-poppins">
        Review & Submit
      </h2>
      <p className="text-gray-500 text-xs mb-5">Finalize your complaint and submit for review</p>

      {/* Previous reporting */}
      <label className="flex items-start gap-2.5 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={data.hasPreviouslyReported}
          onChange={(e) => onChange({ hasPreviouslyReported: e.target.checked })}
          className="w-3.5 h-3.5 mt-0.5 rounded border-gray-300 accent-[#1E3A8A] flex-shrink-0"
        />
        <div>
          <span className="text-xs font-semibold text-gray-800">I have reported this issue before</span>
          <p className="text-[11px] text-gray-500 mt-0.5">Check if you've previously reported this to HR, management, or another authority</p>
        </div>
      </label>

      {data.hasPreviouslyReported && (
        <div className="mb-4 pl-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">Reported To</label>
              <input
                type="text"
                value={data.reportedTo}
                onChange={(e) => onChange({ reportedTo: e.target.value })}
                placeholder="e.g., HR Department, Direct Manager"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">Date Reported</label>
              <input
                type="date"
                value={data.dateReported}
                onChange={(e) => onChange({ dateReported: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1.5">What Action Was Taken?</label>
            <textarea
              value={data.actionTaken}
              onChange={(e) => onChange({ actionTaken: e.target.value })}
              placeholder="Describe any action taken or response received..."
              rows={3}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400 resize-none"
            />
          </div>
        </div>
      )}

      {/* Desired Outcome */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-800 mb-1.5">Desired Outcome</label>
        <textarea
          value={data.desiredOutcome}
          onChange={(e) => onChange({ desiredOutcome: e.target.value })}
          placeholder="What would you like to see happen? (e.g., Back pay, policy change, disciplinary action, transfer, etc.)"
          rows={3}
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] placeholder-gray-400 resize-none"
        />
        <p className="text-[11px] text-gray-400 mt-1">While we cannot guarantee specific outcomes, knowing your goals helps us better assist you.</p>
      </div>

      {/* Confidential notice */}
      <div className="border border-[#1E3A8A] bg-blue-50 rounded-xl p-3.5 mb-4">
        <div className="flex items-start gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1E3A8A] flex-shrink-0 mt-0.5">
            <path d="M12.6667 7.33335V4.66669C12.6667 3.95944 12.3857 3.28117 11.8856 2.78107C11.3855 2.28097 10.7072 2.00002 10 2.00002H4C3.29276 2.00002 2.61448 2.28097 2.11438 2.78107C1.61429 3.28117 1.33334 3.95944 1.33334 4.66669V11.3334C1.33334 12.0406 1.61429 12.7189 2.11438 13.219C2.61448 13.7191 3.29276 14 4 14H6.66668" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.6667 12C14.6667 12.3536 14.5262 12.6928 14.2761 12.9428C14.0261 13.1929 13.687 13.3333 13.3333 13.3333H10.6667C10.313 13.3333 9.97392 13.1929 9.72387 12.9428C9.47382 12.6928 9.33337 12.3536 9.33337 12V9.99999C9.33337 9.64637 9.47382 9.30723 9.72387 9.05718C9.97392 8.80713 10.313 8.66666 10.6667 8.66666H13.3333C13.687 8.66666 14.0261 8.80713 14.2761 9.05718C14.5262 9.30723 14.6667 9.64637 14.6667 9.99999V12Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.3334 8.66666V6.66666C10.3334 6.31304 10.4738 5.9739 10.7239 5.72385C10.9739 5.4738 11.3131 5.33333 11.6667 5.33333C12.0203 5.33333 12.3595 5.4738 12.6095 5.72385C12.8596 5.9739 13 6.31304 13 6.66666V8.66666" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A] mb-1">Keep this complaint confidential</p>
            <p className="text-[11px] text-gray-600">
              Your identity will be protected to the extent possible. Only necessary personnel will have access to your information, and you are protected from retaliation by law.
            </p>
          </div>
        </div>
      </div>

      {/* Complaint summary */}
      <div className="bg-gray-50 rounded-xl p-3.5 mb-4 border border-gray-100">
        <h3 className="text-xs font-bold text-gray-800 mb-2.5">Complaint Summary</h3>
        <div className="space-y-1.5">
          {[
            { label: "Category:", value: data.violationCategory || "—" },
            { label: "Incident Date:", value: data.dateOfIncident || "—" },
            { label: "Location:", value: data.location || "—" },
            { label: "Evidence Files:", value: data.evidenceFiles.length > 0 ? `${data.evidenceFiles.length} file(s)` : "None" },
            { label: "Witnesses:", value: data.hasWitnesses ? "Yes" : "No" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-xs">
              <span className="text-gray-500">{row.label}</span>
              <span className="text-gray-800 font-medium text-right max-w-[60%] truncate">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legal notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3.5">
        <p className="text-[11px] text-gray-700">
          <strong>Legal Notice:</strong> By submitting this complaint, you affirm that the information provided is true and accurate to the best of your knowledge. False complaints may result in disciplinary action. You are protected from retaliation under federal and state law.
        </p>
      </div>
    </div>
  );
}

export default function ComplaintForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_COMPLAINT_FORM_DATA);
  
  // State for tracking DB ID, Loading, and Errors
  const [draftId, setDraftId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const updateFormData = (partial) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const handleNext = async () => {
    setSubmitError(null);
    setIsProcessing(true);

    try {
      // STEP 1: DRAFT CREATION
      if (currentStep === 1) {
        const payload = {
          complaint_type: formData.violationCategory,
          title: formData.complaintTitle,
          description: formData.detailedDescription,
          is_anonymous: formData.keepConfidential
        };
        
        if (!draftId) {
          const res = await api.post('/complaints', payload);
          setDraftId(res.data.complaintId);
        }
      } 
      
      // STEP 2: INCIDENT DETAILS
      else if (currentStep === 2) {
        const payload = {
          dateOfIncident: formData.dateOfIncident,
          timeOfIncident: formData.timeOfIncident,
          location: formData.location,
          isOngoing: formData.isOngoing
        };
        await api.put(`/complaints/${draftId}/step-2`, payload); 
      } 
      
      // STEP 3: PARTIES INVOLVED
      else if (currentStep === 3) {
        const payload = {
          parties: {
            personsInvolved: formData.personsInvolved,
            jobTitle: formData.jobTitle,
            department: formData.department,
            hasWitnesses: formData.hasWitnesses,
            witnessInfo: formData.witnessInfo
          }
        };
        await api.post(`/complaints/${draftId}/parties`, payload);
      } 
      
      // STEP 4: EVIDENCE UPLOAD
      else if (currentStep === 4) {
        if (formData.evidenceFiles.length > 0) {
          const filePayload = new FormData();
          
          formData.evidenceFiles.forEach(file => {
            filePayload.append('files', file); 
          });
          filePayload.append('description', formData.evidenceDescription);

          await api.post(`/complaints/${draftId}/evidence`, filePayload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
      }

      if (currentStep < 5) setCurrentStep((s) => s + 1);

    } catch (error) {
      console.error("Step processing failed:", error);
      setSubmitError(error.response?.data?.message || "Failed to save progress. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setSubmitError(null);

    try {
      // FINAL SUBMISSION
      const res = await api.post(`/complaints/${draftId}/submit`);
      
      // Pass the tracking_id to the success screen
      navigate("/complaint-success", { state: { trackingId: res.data.tracking_id } });

    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(error.response?.data?.message || "Failed to submit complaint. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 data={formData} onChange={updateFormData} />;
      case 2: return <Step2 data={formData} onChange={updateFormData} />;
      case 3: return <Step3 data={formData} onChange={updateFormData} />;
      case 4: return <Step4 data={formData} onChange={updateFormData} />;
      case 5: return <Step5 data={formData} onChange={updateFormData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      <Navbar />

      <main className="max-w-[95%] mx-auto px-6 py-8">
        {/* Hero banner */}
        <div
          className="rounded-2xl p-5 sm:p-7 mb-5 text-white"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #0F766E 100%)' }}
        >
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-[22px] sm:text-[27px] font-bold mb-1 font-poppins">
                  File New Complaint
                </h1>
                <p className="text-white/80 text-xs sm:text-sm">
                  Report a workplace violation with our guided submission process
                </p>
                <div className="flex items-center gap-2 mt-2.5 bg-white/20 rounded-full px-2.5 py-1 w-fit">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 7.33335V4.66669C12.6667 3.95944 12.3857 3.28117 11.8856 2.78107C11.3855 2.28097 10.7072 2.00002 10 2.00002H4C3.29276 2.00002 2.61448 2.28097 2.11438 2.78107C1.61429 3.28117 1.33334 3.95944 1.33334 4.66669V11.3334C1.33334 12.0406 1.61429 12.7189 2.11438 13.219C2.61448 13.7191 3.29276 14 4 14H6.66668" stroke="white" strokeOpacity="0.8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.6667 12C14.6667 12.3536 14.5262 12.6928 14.2761 12.9428C14.0261 13.1929 13.687 13.3333 13.3333 13.3333H10.6667C10.313 13.3333 9.97392 13.1929 9.72387 12.9428C9.47382 12.6928 9.33337 12.3536 9.33337 12V9.99999C9.33337 9.64637 9.47382 9.30723 9.72387 9.05718C9.97392 8.80713 10.313 8.66666 10.6667 8.66666H13.3333C13.687 8.66666 14.0261 8.80713 14.2761 9.05718C14.5262 9.30723 14.6667 9.64637 14.6667 9.99999V12Z" stroke="white" strokeOpacity="0.8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.3334 8.66666V6.66666C10.3334 6.31304 10.4738 5.9739 10.7239 5.72385C10.9739 5.4738 11.3131 5.33333 11.6667 5.33333C12.0203 5.33333 12.3595 5.4738 12.6095 5.72385C12.8596 5.9739 13 6.31304 13 6.66666V8.66666" stroke="white" strokeOpacity="0.8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[11px] text-white/90 font-medium">Confidential & Protected by Law</span>
                </div>
              </div>
            </div>
        </div>

        {/* Step indicator */}
        <div className="bg-white rounded-xl p-4 mb-5 shadow-sm border border-gray-100">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl p-5 sm:p-7 shadow-sm border border-gray-100">
          {renderStep()}

          {/* Error UI */}
          {submitError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              <p className="font-semibold mb-0.5">Submission Error</p>
              <p>{submitError}</p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-7 pt-5 border-t border-gray-100">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || isProcessing}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all
                ${(currentStep === 1 || isProcessing)
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <button
              onClick={currentStep === 5 ? handleSubmit : handleNext}
              disabled={isProcessing}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white text-xs font-semibold transition-opacity 
                ${isProcessing ? 'opacity-70 cursor-wait' : 'hover:opacity-90'}`}
              style={{ background: 'linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)' }}
            >
              {currentStep === 5 
                ? (isProcessing ? "Submitting..." : "Submit Complaint") 
                : (isProcessing ? "Processing..." : "Continue")}
              
              {!isProcessing && currentStep < 5 && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
