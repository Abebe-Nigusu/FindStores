import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateStorePage = () => {
  const [storeName, setStoreName] = useState("");
  const [storeNumber, setStoreNumber] = useState("");
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStore = { storeName, storeNumber, open: false };
    axios
      .post("http://localhost:8000/api/stores", newStore)
      .then((response) => {
        console.log(response.data);

        navigate(`/store/${response.data._id}`);
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
      <p>Add a new store!</p>
      <p>
        <Link to="/"> go back home</Link>
      </p>
      <h3>Add a new job: </h3>
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
          <label> Open?</label>
        </p>
        <button type="submit" className="btn btn-success">
          Add a new Store
        </button>
      </form>
      {errors.map((eachErr, idx) => (
        <p style={{ color: "red" }}> {eachErr}</p>
      ))}
    </div>
  );
};

export default CreateStorePage;
