import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PromotionCard from "../Card";

import api from "../../../services/api";

import "./styles.css";

export default function PromotionSearch() {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};

    if (search) {
      params.title_like = search;
    }

    api.get("/promotions?_embed=comments", { params }).then((response) => {
      setPromotions(response.data);
    });
    console.log("pesquisou");
  }, [search]);

  return (
    <>
      <header>
        <h1>PromoShop</h1>
        <Link to={"/create"} className="creteProductButton">
          Nova promoção
        </Link>
      </header>
      <input
        type="search"
        className="inputSearchBar"
        placeholder="Buscar"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      {promotions.length > 0 ? (
        promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))
      ) : (
        <h2>Não há promoções disponíveis!</h2>
      )}
    </>
  );
}
