import React, { useState, ReactNode } from "react";
import styles from "./ReusableModal.module.css";
import Button from "../ExtraComponent/Button"; // Import the custom Button component

// Define the types for the props
interface ReusableModalProps {
  title: string;
  children: ReactNode; // Children can be any React component or element
  closebtn: string;
  savebtn: string;
  ModalLaunchbtn: ReactNode; // Launch button can be any React component or element
  Modalsize: string;
  showPrintbtn?: boolean;
  showSavebtn?: boolean;
  onSave?: (closeModal: () => void) => Promise<boolean>; // onSave function with closeModal as argument
  hasErrors?: boolean; // Indicates if there are errors
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  children,
  closebtn,
  savebtn,
  ModalLaunchbtn,
  Modalsize,
  showPrintbtn = true,
  showSavebtn = true,
  onSave,
  // hasErrors = false,
  
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (onSave) {
      const success = await onSave(closeModal); // Pass closeModal function to onSave
      if (success) {
        closeModal(); // Only close if the save was successful
      }
    }
  };

  return (
    <>
      <span onClick={openModal}>{ModalLaunchbtn}</span>
      {showModal && (
        <div
          className={`${styles.modal_customize} modal`}
          tabIndex={1}
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className={`modal-dialog ${Modalsize}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">{title}</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <Button
                  text={closebtn}
                  onClick={closeModal}
                  bgColor="#ccc"
                  textColor="black"
                />
                {showSavebtn && (
                  <Button
                    text={savebtn}
                    onClick={handleSave}
                    bgColor="#7B1984"
                    textColor="white"
                  />
                )}
                {showPrintbtn && (
                  <Button
                    text="Print"
                    onClick={handlePrint}
                    bgColor="#7B1984"
                    textColor="white"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReusableModal;
