import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const DetailsPage = () => {
  const [store, setStore] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stores/${id}`)
      .then((response) => {
        setStore(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <p>
        <Link to="/"> go back home</Link>
      </p>
      {store ? (
        <div>
          <h3> {store.storeName}</h3>
          <h3>{store.storeNumber}</h3>
          <h3> {store.open ? "Yes" : "No"}</h3>
          <button>
            <Link to={`/store/edit/${store._id}`}>Edit Store Details</Link>
          </button>
        </div>
      ) : (
        <h1>The Store is not available</h1>
      )}
    </div>
  );
};

export default DetailsPage;
