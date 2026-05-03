import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageComponent from '../components/LandingPage';
import { useFormContext } from '../context/FormContext';

const LandingPage: React.FC = () => {
  const { setSelectedService, resetForm } = useFormContext();
  const navigate = useNavigate();

  const handleSelectService = (service: string) => {
    resetForm();
    setSelectedService(service);
    navigate('/apply/personal');
  };

  return <LandingPageComponent onSelectService={handleSelectService} />;
};

export default LandingPage;
