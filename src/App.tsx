import React from 'react';
import GoalWizard from './components/GoalWizard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Set Your Mentorship Goals
          </h1>
          <p className="text-lg text-gray-600">
            Let's define what you want to achieve through mentorship
          </p>
        </div>
        <GoalWizard />
      </div>
    </div>
  );
}

export default App;