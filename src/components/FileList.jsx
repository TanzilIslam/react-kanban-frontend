import PropTypes from "prop-types";
import { FaRegTrashCan, FaEye } from "react-icons/fa6";

const FileList = ({ files, onDeleteFile }) => {
  const viewFile = (file) => {
    if (file?.id) {
      window.open(
        `${import.meta.env.VITE_FILE_BASE_URL}${file?.path}`,
        "_blank"
      );
    } else {
      const blob = new Blob([file], { type: file.type });
      const dataUrl = URL.createObjectURL(blob);
      window.open(dataUrl, "_blank");
    }
  };
  return (
    <div className="my-4 text-sm">
      <p className="text-gray-500 font-semibold mb-2 ">File List</p>
      {files.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Size
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {file.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{file.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaEye
                      className="text-gray-500 cursor-pointer"
                      onClick={() => viewFile(file)}
                    />
                    <FaRegTrashCan
                      className="text-red-500 cursor-pointer"
                      onClick={() => onDeleteFile(file, index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center text-xs border py-4 shadow rounded ">
          No files uploaded yet.
        </p>
      )}
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onDeleteFile: PropTypes.func.isRequired,
};

const formatFileSize = (sizeInBytes) => {
  const fileSizeInKB = sizeInBytes / 1024;
  return fileSizeInKB < 1024
    ? `${fileSizeInKB.toFixed(2)} KB`
    : `${(fileSizeInKB / 1024).toFixed(2)} MB`;
};

export default FileList;
