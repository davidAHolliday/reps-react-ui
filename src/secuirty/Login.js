import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here using formData
    console.log('Login Data:', formData);
    // Reset form fields after submission if needed
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: 200,height:30 }} // Set the width to 100%

          />
        </div>
     
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: 200,height:30 }} // Set the width to 100%

          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
