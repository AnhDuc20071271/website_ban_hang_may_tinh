import React, { useState } from 'react';
import styles from '../css/HomePage.module.css'; // Import CSS module

// Danh mục sản phẩm
const categories = [
  { name: 'Điện thoại', icon: '📱' },
  { name: 'Laptop', icon: '💻' },
  { name: 'Âm thanh', icon: '🎧' },
  { name: 'Phụ kiện', icon: '🖱️' },
  { name: 'Tivi', icon: '📺' },
  { name: 'Đồng hồ', icon: '⌚' },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái để hiển thị/ẩn dropdown

  // Hàm xử lý chọn danh mục
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false); // Ẩn dropdown sau khi chọn danh mục
  };

  // Hàm toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.homepageContainer}>
     <div className={styles.logoContainer}>
        {/* Sử dụng logo từ thư mục public */}
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.taskbar}>
        <button onClick={toggleDropdown} className={styles.dropdownButton}>
          Danh mục sản phẩm
        </button>
        {showDropdown && (
          <ul className={styles.dropdownMenu}>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategorySelect(category.name)} className={styles.dropdownItem}>
                <span className={styles.categoryIcon}>{category.icon}</span> {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.contentArea}>
        {selectedCategory && (
          <h2>Sản phẩm trong danh mục: {selectedCategory}</h2>
        
        )}
      </div>
    </div>
  );
};

export default HomePage;
