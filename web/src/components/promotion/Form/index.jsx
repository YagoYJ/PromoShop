import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useApi from "../../utils/useApi";
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

  const [load, loadInfo] = useApi({
    method: "get",
    url: `/promotions/${id}`,
    onCompleted: (response) => {
      setValues(response.data);
    },
  });

  const [save, saveInfo] = useApi({
    method: id ? "put" : "post",
    url: id ? `/promotions/${id}` : "/promotions",
    onCompleted: (response) => {
      if (!response.error) {
        history.push("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onChange(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    save({ data: values });
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
        {saveInfo.loading && (
          <span className="statusMessage">Salvando dados...</span>
        )}
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
