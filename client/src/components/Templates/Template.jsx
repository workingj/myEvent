import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateTemplate from "./CreateTemplates";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";

function Template() {
  const { userData } = useAuth();
  const [templateData, setTemplateData] = useState([]);
  const [searchedData, setSearchedData] = useState("");
  const [featchedData, setFeatchedData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("title");
  const [showCreateTemplate, setshowCreateTemplate] = useState(false);
  const [showMainComponent, setshowMainComponent] = useState(true);
  const [error, setError] = useState("");
  const [toEditData, setToEditData] = useState({});
  const [showImage, setshowImage] = useState(false);
  const [imageToShow, setImageToShow] = useState("");
 

  const onDelete = async (id) => {
    const userResponse = window.prompt(
      "Do you want to proceed? Type 'yes' to confirm."
    );

    if (userResponse && userResponse.toLowerCase() === "yes") {
      console.log("User confirmed!");

      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/templates/${id}`,
          { withCredentials: true }
        );
        if (response.data) {
          toast.success("Successfully Deleted!");
          setTemplateData(templateData.filter((e) => e._id !== id));
        } else {
          toast.error("Delete was not successfull !!");
        }
      } catch (error) {
        setError(error.response.data.message);
        toast.error("Login failed!");
      }
    } else {
      console.log("User canceled or entered an invalid response.");
    }
  };

  const handleshowCreateTemplate = () => {
    setshowCreateTemplate(!showCreateTemplate);
    setshowMainComponent(!showMainComponent);
  };

  const onEdit = async (e) => {
    handleshowCreateTemplate();
  };

  function searchData() {
    setTemplateData(
      featchedData.filter(
        (item) =>
          item[selectedOption]
            ?.toLowerCase()
            .includes(searchedData.toLowerCase())
        // item.toLowerCase().includes(searchedData.toLowerCase())
      )
    );
  }

  function onShowImage(e) {
    setImageToShow(e.target.src);
    setshowImage(!showImage);
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/templates`,
        { withCredentials: true }
      );
      if (response.data) {
        setFeatchedData(response.data);
        console.log("From Templates if result.data", response.data);
        setTemplateData(response.data);
      } else {
        setFeatchedData([]);
      }
    } catch (error) {
      setFeatchedData([]);
    }
  };

  const handleChange = (e) => {
    setSearchedData(e.target.value);
  };
  const handleChangeSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      searchData();
    }
  }, [searchedData, setSearchedData]);

  return showMainComponent ? (
    <div className="settings m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
      <h2>MY TEMPLATES</h2>

      <div className="Container Template  m-4 text-center flex justify-center items-center flex-col gap-5 w-full">
        {/* Table */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          {showImage && (
            <div
              onClick={(e) => {
                setImageToShow("");
                setshowImage(!showImage);
                e.stopPropagation();
              }}
              id="showimage"
              className="popup z-10 "
            >
              <img
                src={imageToShow}
                alt="image"
                width="500rem"
                height="250rem"
              />
            </div>
          )}
          <div className="pb-4 ml-2">
            <div className="relative mt-1 flex items-center">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <input
                value={searchedData}
                onChange={handleChange}
                type="text"
                id="table-search"
                className=" pt-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 h-10 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
              <select
                name="select"
                id="select"
                className=" mx-2 pt-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 h-10 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChangeSelect}
              >
                <option value="title">Title</option>
                <option value="content">Content</option>
                <option value="type">Type</option>
              </select>
              {userData.role === "admin" && (
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
                  onClick={handleshowCreateTemplate}
                >
                  Create a new Template
                </button>
              )}
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead
              className="text-xs text-gray-700 uppercase 
              dark:text-gray-400"
            >
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Template Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>

                {userData.role === "admin" && (
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {templateData.map((e) => (
                <tr
                  key={e._id}
                  className="bg-white border rounded-lg"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center"></div>
                  </td>
                  <th
                    scope="row"
                    className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black w-40"
                  >
                    {e.title}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      className=" hover:scale-110 text-xs"
                      src={e.images}
                      alt="No Image"
                      width="100rem"
                      height="100rem"
                      onClick={e.images && onShowImage}
                    />
                  </td>
                  <td>
                    <p className="text-justify">{e.content}</p>
                  </td>
                  <td className="px-6 py-4 w-32">{e.type}</td>
                  <td className="px-6 py-4 text-sm">
                    {userData.role === "admin" && (
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2"
                        onClick={() => {
                          setToEditData({
                            title: e.title,
                            content: e.content,
                            images: e.images,
                            type: e.type,
                            id: e._id,
                            updateFlag: true,
                          }),
                            onEdit();
                        }}
                      >
                        Edit
                      </a>
                    )}
                    {userData.role === "admin" && (
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline p-2"
                        onClick={() => {
                          onDelete(e._id);
                          setToEditData({});
                        }}
                      >
                        Delete
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div>
      {showCreateTemplate && (
        <CreateTemplate
          title={toEditData.title}
          content={toEditData.content}
          images={toEditData.images}
          type={toEditData.type}
          id={toEditData.id}
          updateFlag={toEditData.updateFlag}
        />
      )}
    </div>
  );
}

export default Template;
