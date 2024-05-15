import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const photosPerPage = 6;

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const fetchPhotos = async () => {
    try {
    //   const response = await axios.get(`http://localhost:5000/api/photos?page=${page}&limit=${photosPerPage}`);
      const response = await axios.get(`http://localhost:5000/api/photos`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  const deletePhotos = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/photos/${id}`);
      fetchPhotos()
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleDetails = (id) => {
    navigate(`/details/${id}`)
  }
 

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };



    return (
<div>
      <h2>Photo Gallery</h2>
      <h2>total count of photos{photos.length}</h2>
      <div className="gallery">
        {photos.map(photo => (
          <div key={photo._id} className="photo">
            <img src={`http://localhost:5000/uploads/${photo.imageUrl}`} alt={photo.title} onClick={()=>handleDetails(photo._id)}/>
            <p>{photo.title}</p>
            <button onClick={() => deletePhotos(photo._id)}>delete</button>
          </div>
        ))}
      </div>
      {/* <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>
        <button onClick={handleNextPage}>Next</button>
      </div> */}
    </div>
    )
}

export default PhotoGallery