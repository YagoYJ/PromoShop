import PromotionCard from "./components/promotion/Card";
import "./global.css";

export default function App() {
  const promotion = {
    id: 1,
    title: "Par de Alto Falante Magnum 6 polegadas Rex Fusion 800W 4 Ohms",
    price: 99.99,
    imageUrl:
      "https://images.tcdn.com.br/img/img_prod/710062/par_de_alto_falante_magnum_6_rex_fusion_200w_4_ohms_1623_1_20200828134205.png",
    url:
      "https://www.artsomonline.com.br/alto-falantes/alto-falantes/6/par-de-alto-falante-magnum-6-rex-fusion-200w-4-ohms",
    comments: [
      {
        id: 1,
        comment: "Top d+",
      },
      {
        id: 1,
        comment: "Top d+",
      },
    ],
  };

  return (
    <div
      className="App"
      style={{
        maxWidth: 800,
        margin: "30px auto",
      }}
    >
      <PromotionCard promotion={promotion} />
    </div>
  );
}
