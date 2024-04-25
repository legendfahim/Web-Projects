import { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const FileSharingApp = () => {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileUpload = async () => {
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "3ae601cd46mshc787070de6757b3p117e95jsna41f319e0be1",
            "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
          },
          body: new URLSearchParams({
            url: url,
          }),
        };

        let res = await fetch(
          "https://url-shortener-service.p.rapidapi.com/shorten",
          options
        );

        setDownloadURL(res.result_url);
      } catch (error) {
        setDownloadURL("Internal Server Error!");
      }
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
