import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store the error message

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error before submitting

    try {
      const data = await login(loginData);

      if (!data || !data.token) {
        throw new Error("Login failed"); // Handle case where token is not returned
      }

      Auth.login(data.token); // Save token and login user

    } catch (err: any) {
      // Capture and display the error message
      setErrorMessage(err.message || 'Login failed');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />

        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default Login;
