import React from 'react';
import { Header } from './components/Header';
import { MeasurementForm } from './components/MeasurementForm';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { useBodyMeasurements } from './hooks/useBodyMeasurements';

function App() {
  const { result, loading, handleSubmit } = useBodyMeasurements();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Header />
        <div className="max-w-3xl mx-auto">
          {!result ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-rose-100">
              <MeasurementForm onSubmit={handleSubmit} />
              {loading && (
                <div className="mt-4 text-center text-gray-600">
                  <div className="animate-pulse">Loading recommendations...</div>
                </div>
              )}
            </div>
          ) : (
            <Results result={result} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;