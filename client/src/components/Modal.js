import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

import '../App.css';

const modalElement = document.getElementById('modal');

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
        <MdClose className="modal-close" onClick={close} />
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(Modal);
