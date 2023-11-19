
import React from 'react';
import copy from 'clipboard-copy';

const CopyToClipboardButton = ({ text }) => {
  const handleCopyClick = async () => {
    try {
      await copy(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Error copying text to clipboard:', err);
      alert('Error copying text to clipboard');
    }
  };

  return (
    <button onClick={handleCopyClick}><span className=' bg-pink-300 p-2 rounded-md hover:text-white hover:bg-black'>Copy to Clipboard</span></button>
  );
};

export default CopyToClipboardButton;