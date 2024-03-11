import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

function UploadCards() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [infoCard, setInfoCard] = useState(
    {
      name: "",
      price: '',
    }
  );
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      toast.error("please select a Card to upload");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('image', file);


    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/giftcards/upload`,
        formData,
        {
          headers: {
            "name": infoCard.name,
            "price": infoCard.price,
          },
        }
      
      );
      toast.success("Gift Cards uploaded successfully");
    } catch (error) {
      toast.error("Error uploading gift cards");
    }
    setLoading(false);
  };

  const handleChanges = (e) => {
    setInfoCard({
      ...infoCard,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="settings m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
    <h2>Upload Gift Cards</h2>
    <div
      className=" container m-4 text-center flex justify-center items-center flex-col gap-5 w-full"  >
      
   <form onSubmit= {handleUpload} className='flex flex-col gap-4 w-full items-center justify-center'
   >
   <label htmlFor="name" 
   >Name</label>
    <input
    className='w-1/2 p-2 border border-gray-300 rounded-md'
      type="text"
      name="name"
      value={infoCard.name}
      onChange={handleChanges}
    />
    <label htmlFor="price">Price</label>
    <input
    className='w-1/2 p-2 border border-gray-300 rounded-md'
      type="number"
      name="price"
      value={infoCard.price}
      onChange={handleChanges}
    />





    <input type='file' name='file' onChange={(e) => setFile(e.target.files[0])} 
    className='w-1/2 p-2 border border-gray-300 rounded-md cursor-pointer'
    />
    <button type='submit'
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
    >Upload</button>
  </form>


      </div>
      
    </div>
  )
}

export default UploadCards
