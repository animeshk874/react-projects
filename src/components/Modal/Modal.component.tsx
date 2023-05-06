import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.3)",
    maxWidth: '90%',
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  }
};

ReactModal.setAppElement('#root');

function Modal({
  children,
  isModalOpen,
}: {
  children: JSX.Element,
  isModalOpen: boolean,
}) {
  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </ReactModal>
    </div>
  );
}

export default Modal;