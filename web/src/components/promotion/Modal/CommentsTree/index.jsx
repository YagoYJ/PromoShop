import "./styles.css";

export default function CommentsTree({ comments, children }) {
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
              <button type="button" className="button answerButton">
                Responder
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
