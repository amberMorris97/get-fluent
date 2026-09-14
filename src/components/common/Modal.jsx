import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../context/ModalContext';

import IconButton from './IconButton';

const Modal = () => {
    const modalRef = useRef(null);
    const buttonRef = useRef();

    useEffect(() => {
        buttonRef.current.focus();
    }, []);

    const { isModalOpen, handleCloseModal, modalContent, modalTitle } = useContext(ModalContext);

    useEffect(() => {
        if (isModalOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isModalOpen]);

    return (
        <dialog ref={modalRef} onCancel={handleCloseModal} closedby="any">
            <div className="modal">
                <div className='modal-top-bar'>
                    {modalTitle && <div>{modalTitle}</div>}
                    <IconButton
                        id='close-modal'
                        ref={buttonRef}
                        ariaLabel='Close'
                        handleClick={handleCloseModal}>
                        <i className='fa-solid fa-xmark close-modal-icon'></i>   
                    </IconButton>
                </div>
                {modalContent}
            </div>
        </dialog>
    );
};

export default Modal;