import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import useApi from "../../utils/useApi";
import PromotionList from "../List";

export default function PromotionSearch() {
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    method: "get",
    url: "/promotions",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      title_like: search || undefined,
    },
    debounceDelay: 300,
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });

    if (!mountRef.current) {
      load({
        debounced: true,
      });
    }

    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <header>
        <h1>PromoShop</h1>
        <Link to={"/create"} className="button creteProductButton">
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
      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
    </>
  );
}
