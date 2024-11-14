import axios from 'axios'

export const auth = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/login/', { 
      username: data.username,
      password: data.password,
      otp_code: data.otpCode || null });

    if (response.data.status === 'MFA_REQUIRED') {
        setMfaRequired(true);
    } else {
        // Redirigir o mostrar éxito
    }
  } catch (error) {
      console.error(error);
  }
}