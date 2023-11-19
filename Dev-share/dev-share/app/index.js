import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const FileSharingApp = () => {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');

  const handleFileUpload = async () => {
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setDownloadURL(url);
    }
  };

  return (
    <div>
      <h1>File Sharing App</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleFileUpload}>Upload File</button>
      {downloadURL && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileSharingApp;