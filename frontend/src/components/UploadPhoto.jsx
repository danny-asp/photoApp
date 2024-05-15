import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const navigate = useNavigate()
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
      const response = await axios.post('http://localhost:5000/api/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Photo uploaded successfully:', response.data);
      // Reset form fields
      setFile(null);
      setTitle('');
      navigate("/")
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="image">Choose Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}


export default UploadPhoto