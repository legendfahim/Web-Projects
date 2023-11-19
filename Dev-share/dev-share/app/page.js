
import React from 'react';
import FileUpload from './components/FileUpload';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function MyPage() {
  return (
    <>
      <Navbar />
      <div >
        <h1 className=' block buttom-0 text-blue-700 text-xl text-center m-6'>File Sharing That's Fast, Easy, and Secure.</h1>

        <FileUpload />
      </div>
      <Footer />
    </>
  );
}

export default MyPage;