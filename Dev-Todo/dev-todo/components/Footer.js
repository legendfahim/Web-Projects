import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font fixed bottom-0 w-full bg-orange-100">
      <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col" bis_skin_checked="1">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">Dev-Todo</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 Dev-Todo — Developed by Istiak Rahman
        </p>
      </div>
    </footer>
  );
};

export default Footer;
