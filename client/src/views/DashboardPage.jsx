import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashBoardPage = () => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stores`)
      .then((response) => {
        setStoreList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (deleteId) => {
    axios
      .delete(`http://localhost:8000/api/stores/delete/${deleteId}`)
      .then((response) => {
        const filteredList = storeList.filter(
          (eachStore) => eachStore._id !== deleteId
        );
        setStoreList(filteredList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <table className="table table-stripe">
        <thead>
          <tr>
            <th> Store Name</th>
            <th> Store Number</th>
            <th> Open</th>
            <th colSpan={2}> Actions</th>
          </tr>
        </thead>
        <tbody>
          {storeList.map((eachStore, idx) => (
            <tr key={idx}>
              <td>
                <Link to={`/store/${eachStore._id}`}>
                  {eachStore.storeName}{" "}
                </Link>
              </td>
              <td> {eachStore.storeNumber} </td>
              <td> {eachStore.open ? "Yes" : "No"} </td>

              <td>
                {eachStore.open && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(eachStore._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <button>
          <Link to="/store/add"> Can't find your store?</Link>
        </button>
      </p>
    </div>
  );
};

export default DashBoardPage;
