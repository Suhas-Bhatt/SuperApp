import React, { useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  useEffect(() => {
    document.title = 'Create Account | SuperApp';
  }, []);

  return <RegistrationForm />;
};

export default Register;
