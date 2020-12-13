import "./styles.css";
import { useParams } from "react-router-dom";

export default function PageForm() {
  const { id } = useParams();

  return (
    <div>
      <h1>{id && <div>id: {id}</div>}</h1>
      <h1>Create</h1>
    </div>
  );
}
