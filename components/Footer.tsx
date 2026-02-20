import React from 'react';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <footer className="bg-white dark:bg-gray-950 py-8 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {name}. Bảo lưu mọi quyền.
        </p>
        <p className="text-gray-400 dark:text-gray-600 text-xs mt-2">
          Thiết kế cho nhà sáng tạo nội dung hiệu suất cao.
        </p>
      </div>
    </footer>
  );
};

export default Footer;