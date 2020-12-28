import { useState } from "react";
import "./styles.css";

export default function CommentsTree({
  comments,
  sendAnswerComment,
  children,
}) {
  const [activeAnswerBox, setActiveAnswerBox] = useState(null);
  const [answerComment, setAnswerComment] = useState("");

  if (!comments) {
    return (
      <>
        {children} <p className="statusMessage">Carregando...</p>
      </>
    );
  }
  if (comments.length === 0) {
    return (
      <>
        {children} <p className="statusMessage">Zero comentários</p>
      </>
    );
  }

  return (
    <>
      {children}
      <ul className="commentsTreeList">
        {comments.map((item) => (
          <li key={item.id} className="commentsTreeItem">
            <div className="left">
              <img
                src={item.user.avatar_url}
                alt={item.user.name}
                className="commentsTreeUserAvatar"
              />
            </div>
            <div className="right">
              <span className="commentsTreeUserName">{item.user.name}</span>
              <p className="commentsTreeComment"> {item.comment} </p>
              <button
                type="button"
                className="button answerButton"
                onClick={() => {
                  setAnswerComment("");
                  setActiveAnswerBox(
                    activeAnswerBox === item.id ? null : item.id
                  );
                }}
              >
                Responder
              </button>
              {activeAnswerBox === item.id && (
                <div className="commentsTreeAnswerBox">
                  <textarea
                    className="commentsTreeAnswerInput"
                    placeholder="Comentar"
                    rows="5"
                    value={answerComment}
                    onChange={(event) => {
                      setAnswerComment(event.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="button sendAnswerButton"
                    onClick={() => {
                      sendAnswerComment(answerComment, item.id);
                      setAnswerComment("");
                      setActiveAnswerBox(null);
                    }}
                  >
                    Responder
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

CommentsTree.defaultProps = {
  sendAnswerComment: () => {},
};
