
import React from 'react';
import { Subject } from '../types';
import { SUBJECTS } from '../constants';

interface SubjectSelectorProps {
  onSelect: (subject: Subject) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Learner!</h2>
        <p className="text-gray-600">Choose a subject to begin your CBC competency assessment.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SUBJECTS.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject)}
            className="group p-5 bg-white border-2 border-transparent hover:border-[#008751] rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex items-start gap-4 active:scale-95"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{subject.icon}</span>
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-[#008751]">{subject.name}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-snug">{subject.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-12 text-center p-4 rounded-xl bg-yellow-50 border border-yellow-100">
        <p className="text-sm text-yellow-800">
          <strong>Tip:</strong> Be expressive in your answers to show your competencies in thinking and communication!
        </p>
      </div>
    </div>
  );
};

export default SubjectSelector;
