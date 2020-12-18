import Form from "../../components/promotion/Form";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function PageForm() {
  const { id } = useParams();
  return (
    <div>
      <Form id={id ? Number.parseInt(id, 10) : null} />
    </div>
  );
}
