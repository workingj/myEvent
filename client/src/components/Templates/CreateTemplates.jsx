import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SpinnerDiamond } from "spinners-react";

function CreateTemplate({
  title: title,
  content: content,
  images: images,
  type: type,
  updateFlag:updateFlag,
  id:id
}) {
  const [sending, setSending] = useState(false);
  const [postData, setPostData] = useState({

    title: title,
    content: content,
    type: type,
    images: images,
  });



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
          type: "",
        });
        setSending(false);
        navigate(`${import.meta.env.VITE_API_URL}/admin/templates`);
        toast.success("Successfully created!");
      }
    } catch (error) {
      setSending(false);
      toast.error(error.response.data.message);
    }
  };
  

  const handleUpdate = async (e) => {
    // setPostData({ ...postData, [e.target.name]: e.target.value });
    // handleChange();
    // e.preventDefault();
    setSending(true);
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/templates/${id}`,
        postData,
        {
          withCredentials: true,
        }
      );
      console.log('Results.status after update',result.status);
      if (result.status === 200) {
        setPostData({
          title: "",
          content: "",
          imeges: "",
          type: "",
        });
        setSending(false);
        navigate(`${import.meta.env.VITE_API_URL}/admin/templates`);
        toast.success("Successfully updated!");
      }
    } catch (error) {
      setSending(false);
      toast.error(error.response.data.message);
    }
  };

  const handleCancelButtonClick = () => {
    navigate(`${import.meta.env.VITE_API_URL}/admin/templates`);
    //  setShowComponent(false);
    // Add additional cancel logic here if needed
  };
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };



  useEffect(() => {
    document.body.classList.add("bg-white");console.log('id',id);
    return () => {
      document.body.classList.remove("bg-white");
      navigate("/admin/templates");
    };
    
  }, []);



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
    <div className="w-screen h-screen  bg-black bg-opacity-30 ">
      <div className="popup">
        <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80 ">
          <div className="p-4 ">
            <h2 className="text-2xl font-semibold mb-4">Create a new Template</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="mb-2 text-sm">{updateFlag == true ? 'Title' : ''}</p>
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
                <p className="mb-2 text-sm">{updateFlag == true ? 'Content' : ''}</p>
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
                <p className="mb-2 text-sm">{updateFlag == true ? 'Type' : ''}</p>
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
                <p className="mb-2 text-sm">{updateFlag == true ? 'Image URLs' : ''}</p>
                <input
                  placeholder="Image-URL"
                  type="text"
                  name="images"
                  value={postData.images}
                  onChange={handleChange}
                  className="border rounded-full w-full p-2"
                />
              </div>
              {updateFlag !== true ? <button
                type="submit"
                className="btn okBtn btnSizeB"
              >
                Submit
              </button> :
                <button
                  onClick={handleUpdate}
                  className="btn okBtn btnSizeB"
                >
                  Update
                </button>}
              <button
                className="btn cancelBtn btnSizeB"
                onClick={handleCancelButtonClick}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTemplate;
