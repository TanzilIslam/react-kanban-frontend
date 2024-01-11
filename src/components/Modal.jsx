import PropTypes from "prop-types";
const Modal = ({ showModal, handleCloseModal, children }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto duration-300 ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-fit min-w-[400px] sm:w-full ${
            showModal ? "sm:w-full" : "sm:w-0"
          }`}
        >
          <div className="bg-white  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => handleCloseModal()}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white  text-base font-medium text-gray-700  hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired, // Whether the modal should be visible or not
  handleCloseModal: PropTypes.func.isRequired, // Function to close the modal,
  children: PropTypes.node,
};

export default Modal;
