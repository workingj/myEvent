import { useState, useEffect } from 'react';
import axios from 'axios';


function ShowGiftCards({ handleCancelGiftCards }) {
  const [cards, setCards] = useState([]);


  useEffect(() => {
    fetchcards();
  }, []);

  const fetchcards = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/giftcards`);
      setCards(response.data);
    } catch (error) {
      console.error('error fetching cards', error);
    }
  };
  return (
    <div className="popup fixed inset-0 flex items-center justify-center">
      <div className="container mx-auto  bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-4">Choose a Gift Card</h2>
          <div className="mb-4">
            <div className="flex flex-wrap gap-4">
              {cards&&cards.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt={image._id}
                  className="object-cover h-24 w-48"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                handleCancelGiftCards(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowGiftCards;
