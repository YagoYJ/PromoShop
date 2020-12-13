import { useEffect, useState } from "react";
import PromotionCard from "../../components/promotion/Card";
import api from "../../services/api";
import "./styles.css";

export default function PageSearch() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    api.get("/promotions?_embed=comments").then((response) => {
      setPromotions(response.data);
    });
  }, []);

  return (
    <>
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
