import React, { useState } from 'react';
import styles from '../css/RegisterForm.module.css'; // Nhúng CSS module

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ username: formData.username, email: formData.email, password: formData.password });
      localStorage.setItem('users', JSON.stringify(users));
      window.location.href = '/login'; // Chuyển hướng tới trang đăng nhập
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={styles.formControl}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className={styles.textDanger}>{errors.username}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={styles.formControl}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className={styles.textDanger}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={styles.formControl}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className={styles.formControl}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && <p className={styles.textDanger}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className={styles.btnPrimary}>Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
