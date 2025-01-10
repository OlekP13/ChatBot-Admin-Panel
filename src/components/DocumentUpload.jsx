import React, { useState, useRef } from "react";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "./index.css";
// import { trainPdf } from "../../../reducers/botReducer";
// import { useSelector, useDispatch } from "react-redux";

const DocumentUpload = () => {
  const inputFile = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = useState([]);

  const openFileDialog = () => {
    if (inputFile !== null) inputFile.current.click();
  };

  const selectFile = (event) => {
    event.preventDefault();
    const { files } = event.target;
    const selectedFiles = files;
    console.log(selectedFiles);
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setFiles(e.dataTransfer.files);
    }
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      className="h-[350px] m-3 flex justify-center items-center flex-col"
    >
      <div
        className="bg-gray-100 p-4 text-center border rounded-md border-dashed border-blue-400 text-blue-400 hover:cursor-pointer w-[250px]"
        onClick={() => openFileDialog()}
      >
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={selectFile}
          multiple
        />
        <div className="flex flex-col items-center justify-center p-4">
          <p style={{ width: "30px", height: "30px" }} className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"
                fill="blue"
              ></path>
            </svg>
          </p>
          <h2 className="text-base font-semibold text-gray-800  mb-1">
            Click or drag file to this area to upload
          </h2>
        </div>
      </div>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      <button
        className="transition border border-blue-600 bg-blue-600 text-white p-2 rounded-md text-md w-[80%] hover:text-blue-600 hover:bg-white mt-5"
      >
        Add Documents
      </button>
    </form>
  );
};

export default DocumentUpload;
