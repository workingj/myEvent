import React, { useState } from "react";

function ShowTemplets({
  templateData,
  setTemplateData,
  handleCancelTemplate,
  setTemplate,
  setEvent
}) {
  const [contentPopup, setContentPopup] = useState(false);
  return (
    <div
      className="popup fixed inset-0 flex items-center justify-center"
      // onClick={handleCancelTemplate}
    >
      <div className="container mx-auto  bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-4">Choose a Template</h2>
          <div className="mb-6">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Content</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {templateData &&
                  templateData.map((template) => (
                    <tr key={template._id}>
                      <td className="border px-4 py-2">{template.title}</td>
                      <td
                        className="border px-4 py-2 max-w-xs truncate
                      "
                      >
                        {/* show more */}
                        <a
                          className="btn editBtn"
                          onClick={() => {
                            setContentPopup(true);
                          }}
                        >
                          Show more
                        </a>
                        {template.content}
                      </td>
                      {contentPopup && (
                        <div className="popup fixed inset-0 flex items-center justify-center">
                          <div className="container mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
                            <div className="p-8">
                              <h2 className="text-3xl font-semibold mb-4">
                                Template Content
                              </h2>
                              <div className="mb-4">
                                <p className="block mb-2">Content:</p>
                                <textarea
                                  name="content"
                                  value={template.content}
                                  className="border rounded w-full p-2 h-72"
                                  disabled
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  className="btn cancelBtn"
                                  onClick={() => {
                                    setContentPopup(false);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <td className="border px-4 py-2">{template.type}</td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            className="btn editBtn"
                            onClick={() => {
                              setTemplate(template);
                              // const [event, setEvent] = useState({
                              //   actionDate: "",
                              //   title: "",
                              //   text: "",
                              //   image: "",
                              //   eventNR: latestEventNR,
                              //   user: userData._id,
                              //   contact: "",
                              // });
                              setEvent((prev) => ({
                                ...prev,
                                title: template.title,
                                text: template.content,
                                image: template.images,
                              }));

                              handleCancelTemplate();
                            }}
                          >
                            Choose
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button className="btn cancelBtn" onClick={handleCancelTemplate}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTemplets;
