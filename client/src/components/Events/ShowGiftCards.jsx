import { useState, useEffect } from "react";
import axios from "axios";


function ShowGiftCards({ handleCancelGiftCards , setGiftCards, giftCards, setEvent, event}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchcards();
  }, []);

  const fetchcards = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/giftcards`
      );
      setCards(response.data);
      
    } catch (error) {
      console.error("error fetching cards", error);
    }
  };
  return (
    <div className="popup fixed inset-0 flex items-center justify-center"
    // onClick={handleCancelGiftCards}
    >
      <div className="container mx-auto  bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-4">Choose a Gift Card</h2>
          <div className="mb-4">
            <div className="flex flex-wrap gap-4">
              {cards &&
                cards.map((image) => (
                  <div
                    key={image._id}
                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
                  >
                    <input
                      type="radio"
                      id={image._id}
                      name="giftcard"
                      value={image._id}
                      onClick={() => {
                        setGiftCards(image);
                      }}
                    />
                    <label
                      htmlFor={image._id}
                      className="cursor-pointer block mb-2"
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="  rounded w-full h-48"
                      />
                    </label>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-1">
                        {image.name}
                      </h3>
                      <p className="text-gray-600">Price: {image.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                setEvent({ ...event, coupon: giftCards.price });
                
                handleCancelGiftCards(false);

              }}
            >
              Confirm
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => {
                setGiftCards([]);
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
