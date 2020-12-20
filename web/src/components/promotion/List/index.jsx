import PromotionCard from "../Card";

export default function PromotionList({ promotions, loading, error }) {
  if (loading || promotions === null) {
    return <h2 className="statusMessage">Carregando...</h2>;
  }

  if (promotions.length === 0) {
    return <h2 className="statusMessage">Nenhuma promoção encontrada</h2>;
  }

  if (error) {
    return (
      <h2 className="statusMessage">Hove um error interno, tente novamente</h2>
    );
  }

  return (
    <>
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.id} promotion={promotion} />
      ))}
    </>
  );
}
