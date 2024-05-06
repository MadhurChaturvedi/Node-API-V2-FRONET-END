import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";


function CreatePage() {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [url, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitProduct = async (e) => {
    e.preventDefault();
    if (name === "" || qty === "" || price === "" || url === "") {
      alert("please fill out all input completely");
      return;
    }
    try {
      setIsLoading(true);
      const respose = await axios.post(`${VITE_BACKEND_URL}/api/products/`, {
        name: name,
        quantity: qty,
        price: price,
        image: url,
      });
      // console.log(respose.data.name);
      toast.success("Data add successfully");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      // toast.error("error");
    }
  };
  return (
    <div className=" max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className=" font-semibold text-2xl  mb-4 block text-center">
        Create a Product
      </h2>
      <form onSubmit={submitProduct}>
        <div className=" space-y-2">
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Quantity</label>
            <input
              type="text"
              className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
              placeholder="Enter Quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              type="text"
              className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Image Url</label>
            <input
              type="text"
              className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
              placeholder="Enter Url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className=" block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
            >
              Save
            </button>
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default CreatePage;
