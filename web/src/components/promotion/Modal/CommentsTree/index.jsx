import { useMemo, useState } from "react";
import "./styles.css";

function getTree(list) {
  if (!list) {
    return [];
  }
  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }

    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }

    childrenByParentId[item.parentId].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }

    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id]),
    }));
  }

  return buildNodes(roots);
}

export default function CommentsTree({
  comments,
  sendAnswerComment,
  children,
}) {
  const tree = useMemo(() => getTree(comments), [comments]);
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

  function renderItem(item) {
    return (
      <>
        <li key={item.id} className="commentsTreeItem">
          <div className="commentGroup">
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
          </div>
          {item.children ? renderList(item.children) : <hr />}
        </li>
      </>
    );
  }

  function renderList(list) {
    return <ul className="commentsTreeList">{list.map(renderItem)}</ul>;
  }

  return (
    <>
      {children} {renderList(tree)}
    </>
  );
}

CommentsTree.defaultProps = {
  sendAnswerComment: () => {},
};
