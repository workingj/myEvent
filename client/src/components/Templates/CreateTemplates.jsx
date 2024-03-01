import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SpinnerDiamond } from "spinners-react";

function CreateTemplates() {
  const [sending, setSending] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    templatenumber: "",
    type:"",
    images: "",
  });


    useEffect(() => {
      document.body.classList.add("bg-white");
      return () => {
        document.body.classList.remove("bg-white");
      };
    }, []); 
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/templates`,
        postData,
        {
          withCredentials: true,
        }
      );
      if (result.status === 201) {
        setPostData({
          title: "",
          content: "",
          imeges: "",
          templatenumber: "",
          type: "",
        });
        setSending(false);
        navigate("/admin/templates");
        toast.success("Successfully created!");
      }
    } catch (error) {
      setSending(false);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  if (sending) {
    return (
      <div className="">
        <SpinnerDiamond
          size={50}
          thickness={100}
          speed={100}
          color="rgba(57, 107, 172, 1)"
        />
      </div>
    );
    
  }
  return (
    <div className="w-screen h-screen  bg-black bg-opacity-30">
      <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Create a new Template</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="mb-2 text-xl"></p>
              <input
                placeholder="Title"
                type="text"
                name="title"
                value={postData.title}
                onChange={handleChange}
                className="border rounded-full w-full p-2"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 text-xl"></p>
              <textarea
                placeholder="Content"
                name="content"
                cols="30"
                rows="10"
                value={postData.content}
                onChange={handleChange}
                className="border rounded-xl w-full p-2"
              ></textarea>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-xl"></p>
              <input
                placeholder="Template Number (tag)"
                type="text"
                name="templatenumber"
                value={postData.templatenumber}
                onChange={handleChange}
                className="border rounded-full w-full p-2"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 text-xl"></p>
              <input
                placeholder="Type (Birth Date, Marriage,...)"
                type="text"
                name="type"
                value={postData.type}
                onChange={handleChange}
                className="border rounded-full w-full p-2"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 text-xl"></p>
              <input
                placeholder="Image-URL"
                type="text"
                name="images"
                value={postData.images}
                onChange={handleChange}
                className="border rounded-full w-full p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 p-4 rounded-full text-white font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTemplates;
