import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className="text-gray-700 body-font bg-gradient-to-r from-yellow-50 via-white to-yellow-50 border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl font-bold tracking-wider">Dev-Todo</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900 hover:underline active:text-red-500 p-2 rounded-lg transition duration-300 ease-in-out">
            Home
          </Link>
          <Link href="/todos" className="mr-5 hover:text-gray-900 hover:underline active:text-red-500 p-2 rounded-lg transition duration-300 ease-in-out">
            All Todos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

