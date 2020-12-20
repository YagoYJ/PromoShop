import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function PromotionCard({ promotion, onClickComments }) {
  return (
    <div className="promotionCard">
      <div className="productImage">
        <img src={promotion.imageUrl} alt={promotion.title} />
      </div>

      <div className="descriptions">
        <header className="descriptionsHeader">
          <h1>{promotion.title}</h1>
          <Link to={`edit/${promotion.id}`} className="button">
            Editar
          </Link>
        </header>
        <span>R$ {promotion.price}</span>

        <footer>
          {promotion.comments.length > 0 && (
            <p className="lastComment">"{promotion.comments[0].comment}"</p>
          )}

          <button className="commentsCount" onClick={onClickComments}>
            {promotion.comments.length}
            {promotion.comments.length > 1 ? " comentários" : " comentário"}
          </button>

          <a
            href={promotion.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            IR PARA O SITE
          </a>
        </footer>
      </div>
    </div>
  );
}
