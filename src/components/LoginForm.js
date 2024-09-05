import React, { useState } from 'react';

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Lấy danh sách tài khoản từ localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (user) =>
          user.username === formData.username && user.password === formData.password
      );

      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        window.location.href = '/'; // Chuyển về trang chủ
      } else {
        setErrors({ auth: 'Sai tên đăng nhập hoặc mật khẩu' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="text-danger">{errors.username}</p>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>

        {errors.auth && <p className="text-danger">{errors.auth}</p>}

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
