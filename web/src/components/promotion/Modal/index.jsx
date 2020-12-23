import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import useApi from "../../utils/useApi.js";

import CommentsTree from "./CommentsTree/index.jsx";

import "./styles.css";

const portalRoot = document.getElementById("portal-root");

export default function PromotionModal({
  // children,
  isOpen,
  onClickClose,
  promotionId,
}) {
  const [load, loadInfo] = useApi({
    url: "/comments",
    params: {
      promotionId,
      _expand: "user",
    },
  });

  const [comment, setComment] = useState("");
  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "POST",
  });

  async function handleSubmitComment(event) {
    event.preventDefault();

    try {
      await sendComment({
        data: {
          userId: 1,
          promotionId,
          comment,
        },
      });

      setComment("");
      load();
    } catch (error) {}
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <main>
          <CommentsTree comments={loadInfo.data}>
            <form
              className="commentsTreeCommentForm"
              onSubmit={handleSubmitComment}
            >
              <textarea
                className="commentsTreeCommentInput"
                placeholder="Comentar"
                rows="5"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <button
                className="button"
                type="submit"
                disabled={sendCommentInfo.loading}
              >
                {sendCommentInfo.loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </CommentsTree>
        </main>
      </div>
    </div>,
    portalRoot
  );
}
