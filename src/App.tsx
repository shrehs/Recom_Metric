import React from 'react';
import { Header } from './components/Header';
import { MeasurementForm } from './components/MeasurementForm';
import { Results } from './components/Results';
import { useBodyMeasurements } from './hooks/useBodyMeasurements';

function App() {
  const { result, loading, handleSubmit } = useBodyMeasurements();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Header />
        <div className="max-w-3xl mx-auto">
          {!result ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <MeasurementForm onSubmit={handleSubmit} />
              {loading && (
                <div className="mt-4 text-center text-gray-600">
                  Loading recommendations...
                </div>
              )}
            </div>
          ) : (
            <Results result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;