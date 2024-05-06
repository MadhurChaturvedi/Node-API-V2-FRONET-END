import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

function EditPage() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });
  const getProduct = async () => {
    setIsLoading(true);
    try {
      const respose = await axios.get(`${VITE_BACKEND_URL}/api/products/${id}`);
      setProduct({
        name: respose.data.name,
        quantity: respose.data.quantity,
        price: respose.data.price,
        image: respose.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateProducts = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`, product);
      toast.success("Product update Successfully");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className=" max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className=" font-semibold text-2xl  mb-4 block text-center">
        Update a Product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <form onSubmit={updateProducts}>
          <div className=" space-y-2">
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
                placeholder="Enter Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="">Quantity</label>
              <input
                type="text"
                className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
                placeholder="Enter Quantity"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="">Price</label>
              <input
                type="text"
                className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
                placeholder="Enter Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="">Image Url</label>
              <input
                type="text"
                className=" w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-400 placeholder:gray-400"
                placeholder="Enter Url"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
            </div>
            <div>
              <button
                type="submit"
                className=" block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
              >
                Upade
              </button>
            </div>
            <ToastContainer />
          </div>
        </form>
      )}
    </div>
  );
}

export default EditPage;
