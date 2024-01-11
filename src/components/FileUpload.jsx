import { useRef } from "react";
import PropTypes from "prop-types";
import { FaLink } from "react-icons/fa6";

const FileUpload = ({ files, onFilesSelected }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      let files = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        // Check if file size is less than or equal to 4MB
        if (file.size <= 4 * 1024 * 1024) {
          files.push(file);
        } else {
          alert(`File ${file.name} exceeds the maximum size limit (4MB).`);
        }
      }
      onFilesSelected(files);
    }
  };

  const handleSelectClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-end gap-4 text-sm">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />
      <button
        className="flex items-center gap-2 bg-blue-500 text-white px-6 py-1 text-center rounded"
        onClick={handleSelectClick}
      >
        <FaLink />
        Files Upload
      </button>
    </div>
  );
};

FileUpload.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.object),
};

export default FileUpload;
