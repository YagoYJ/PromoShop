import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const initialValue = {
  title: "",
  price: 0,
  imageUrl: "",
  url: "",
};

export default function Form({ id }) {
  const [values, setValues] = useState(id ? null : initialValue);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/promotions/${id}`).then((response) => {
        setValues(response.data);
      });
    }
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:5000/promotions/${id}`
      : "http://localhost:5000/promotions";

    axios[method](url, values).then((response) => {
      history.push("/");
    });
  }

  if (!values) {
    return (
      <div className="gifContainer">
        <img
          src="https://escolapt.files.wordpress.com/2020/07/loading-icon-animated-gif-19.gif"
          alt="loading"
          className="loadingGif"
        />
      </div>
    );
  }

  return (
    <>
      <h1>PromoShop</h1>

      <h2>{id ? "Editar" : "Nova"} promoção</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="title">Título</label>
          <input
            onChange={onChange}
            type="text"
            id="title"
            name="title"
            placeholder="ex: Celular, Televisão, Caixa de som"
            value={values.title}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="price">Preço</label>
          <input
            onChange={onChange}
            type="number"
            id="price"
            name="price"
            placeholder="100.00"
            value={values.price}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="imageUrl">Link da imagem</label>
          <input
            onChange={onChange}
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Copie a Link da imagem e cole aqui"
            value={values.imageUrl}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="url">Link do site</label>
          <input
            onChange={onChange}
            type="text"
            id="url"
            name="url"
            placeholder="Copie a Link do site e cole aqui"
            value={values.url}
            required
          />
        </div>

        <button className="button submitButton" type="submit">
          Salvar
        </button>
      </form>
    </>
  );
}
