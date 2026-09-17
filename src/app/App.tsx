import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Features } from './components/Features';
import { HealthRecords } from './components/HealthRecords';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DiagnosticAnalyzer } from './components/DiagnosticAnalyzer';

export default function App() {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [analyzerPatient, setAnalyzerPatient] = useState<any>(null);

  const openAnalyzer = (patientData: any = null) => {
    setAnalyzerPatient(patientData);
    setIsAnalyzerOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Header onOpenAnalyzer={() => openAnalyzer()} />
      <main>
        <Hero onOpenAnalyzer={() => openAnalyzer()} />
        <Services onOpenAnalyzer={() => openAnalyzer()} />
        <Features />
        <HealthRecords onOpenAnalyzer={openAnalyzer} />
        <About />
        <Contact />
      </main>
      <Footer />
      <DiagnosticAnalyzer
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        initialData={analyzerPatient}
      />
    </div>
  );
}