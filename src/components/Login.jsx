import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  otpCode: Yup.string().when('mfaRequired', {
    is: true,
    then: () => Yup.string().required('El código OTP es requerido'),
  })
});

const Login = () => {
  const [mfaRequired, setMfaRequired] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    // Aquí iría tu lógica de autenticación
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          otpCode: '',
          mfaRequired: mfaRequired
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <Field
                name="password"
                type="password"
                placeholder="Contraseña"
                className="form-control"
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            {mfaRequired && (
              <div className="form-group">
                <Field
                  name="otpCode"
                  type="text"
                  placeholder="Código OTP"
                  className="form-control"
                />
                {errors.otpCode && touched.otpCode && (
                  <div className="error">{errors.otpCode}</div>
                )}
              </div>
            )}

            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;