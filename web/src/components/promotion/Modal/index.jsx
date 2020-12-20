import ReactDOM from "react-dom";

import "./styles.css";

const portalRoot = document.getElementById("portal-root");

export default function PromotionModal({ children, isOpen, onClickClose }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        <header>
          <h1>Comentários</h1>
          <button
            type="button"
            className="button closeButton"
            onClick={onClickClose}
          >
            X
          </button>
        </header>
        <main>{children}</main>
      </div>
    </div>,
    portalRoot
  );
}
