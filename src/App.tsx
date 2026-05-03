import { Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import LandingPage from './pages/LandingPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage';
import ContactInformationPage from './pages/ContactInformationPage';
import AdditionalInformationPage from './pages/AdditionalInformationPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply/personal" element={<PersonalDetailsPage />} />
        <Route path="/apply/contact" element={<ContactInformationPage />} />
        <Route path="/apply/additional" element={<AdditionalInformationPage />} />
        <Route path="/apply/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FormProvider>
  );
}

export default App;