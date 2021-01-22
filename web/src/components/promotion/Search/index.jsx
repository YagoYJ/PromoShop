import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useApi from "../../utils/useApi";
import PromotionList from "../List";
import InfiniteScroll from "../../InfiniteScroll";

import "./styles.css";

const baseParams = {
  _embed: "comments",
  _order: "desc",
  _sort: "id",
  _limit: 5,
};

export default function PromotionSearch() {
  const [page, setPage] = useState(1);
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    method: "get",
    url: "/promotions",
    debounceDelay: 300,
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined,
      },
    });

    if (!mountRef.current) {
      load({
        debounced: true,
        params: {
          ...baseParams,
          _page: 1,
          title_like: search || undefined,
        },
      });
    }

    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function fetchMore() {
    const newPage = page + 1;
    load({
      isFetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },
      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [...prevRequestInfo.data, ...newRequestInfo.data],
      }),
    });
    setPage(newPage);
  }

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
      {loadInfo.data &&
        !loadInfo.loading &&
        loadInfo.data?.length < loadInfo.total && (
          <InfiniteScroll fetchMore={fetchMore} />
        )}
    </>
  );
}
