import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateStorePage = () => {
  const { id } = useParams();

  const [storeName, setStoreName] = useState("");
  const [storeNumber, setStoreNumber] = useState("");
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stores/${id}`)
      .then((response) => {
        const store = response.data;

        setStoreName(store.storeName);
        setStoreNumber(store.storeNumber);
        setOpen(store.open);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStore = { storeName, storeNumber, open };
    axios
      .put(`http://localhost:8000/api/stores/update/${id}`, updatedStore)
      .then((response) => {
        navigate(`/store/${id}`);
      })
      .catch((err) => {
        const errorResponseData = err.response.data.errors;
        const errMsgArr = [];

        for (const eachKey in errorResponseData) {
          errMsgArr.push(errorResponseData[eachKey].message);
        }
        setErrors(errMsgArr);
        console.log(errMsgArr);
      });
  };

  return (
    <div>
      <p>
        <Link to="/"> go back home</Link>
      </p>
      <h3>Edit this store! </h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label> Store Name</label>
          <input
            type="text"
            name="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="form-control"
          />
        </p>

        <p>
          <label> Store Number</label>
          <input
            type="Number"
            name="storeNumber"
            value={storeNumber}
            onChange={(e) => setStoreNumber(e.target.value)}
            className="form-control"
          />
        </p>
        <p>
          <input
            type="checkbox"
            name="open"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
          />
          <label> Open</label>
        </p>
        <button type="submit" className="btn btn-success">
          Edit Store
        </button>
      </form>
      {errors.map((eachErr, idx) => (
        <p style={{ color: "red" }}> {eachErr}</p>
      ))}
    </div>
  );
};

export default UpdateStorePage;
