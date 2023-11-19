
'use client';
import React, { useState } from 'react';
import firebase from '../lib/firebase';
import 'firebase/compat/storage';
import CopyToClipboardButton from '../components/CopyToClipboardButton';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileUpload = async () => {
    setLoading(true);

    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setDownloadURL(url);
    } else {
      alert('Please Choose a File.');
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : '');
  };

  return (
    <div className='font-semibold'>
      <div className='flex flex-col items-center h-40'>
        <h1 className='text-lg pt-4'>Upload the file you want to share...</h1>

        <label
          htmlFor='fileInput'
          className='bg-red-300 text-white rounded-lg px-4 py-2 mt-4 cursor-pointer hover:bg-red-400'
        >
          Choose File
        </label>
        <input
          id='fileInput'
          className='hidden'
          type='file'
          onChange={handleFileChange}
        />

        {/* Display selected file name on small screens */}
        <p className='mt-2 text-xs text-gray-500 sm:text-xs'>
          {selectedFileName}
        </p>

        <div className='flex justify-between w-full max-w-md mt-2'>
          <button onClick={handleFileUpload} className='m-auto'>
            <span className='text-lg px-3 py-2 bg-cyan-400 hover:text-xl hover:bg-green-300 rounded-md text-white'>
              Upload
            </span>
            {loading && (
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {downloadURL && (
        <div className='text-center py-4'>
          <p>File uploaded successfully!</p>

          <p className='text-purple-600'>File Download Link</p>
          <p className=" text-red-600">Note: Your link will be destroyed after 1 week </p>
          <div className='w-full max-w-md mx-auto text-xs text-center rounded bg-black p-2 text-white break-all'>
            <a
              href={downloadURL}
              target='_blank'
              rel='noopener noreferrer'
            >
              {downloadURL}
            </a>
          </div>
          <CopyToClipboardButton text={downloadURL} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;