import axios from "axios";
import React, { useEffect, useState } from "react";
// import Product from "../components/Product";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";

function HomePage() {
  const deleteproduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "yes , delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`);
        toast.success("Delete a product successfully!", { autoClose: 1000 });
        getPorduct();
      } catch (error) {
        toast.error(error.message);
      }
      result();
    }
  };

  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPorduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VITE_BACKEND_URL}/api/products`);
      console.log(response.data);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPorduct();
  }, []);
  return (
    <div>
      <div>
        <Link
          to="/create"
          className=" inline-block  w-24  text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
        >
          Create
        </Link>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-5 px-2">
        {isLoading ? (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        ) : (
          <>
            {product.length > 0 ? (
              <>
                {product.map((product, index) => {
                  return (
                    <div
                      className=" bg-white rounded shadow-lg overflow-hidden"
                      key={index}
                    >
                      <img
                        src={product.image}
                        className=" w-full h-28 object-contain border p-2"
                        alt=""
                      />
                      <div className=" px-4 pt-2 pb-4">
                        <h2 className=" text font-semibold">{product.name}</h2>
                        <div className=" text-sm">
                          Quantity:{product.quantity}
                        </div>
                        <div className=" text-sm">Price:{product.price}</div>
                        <div className=" mt-2 flex gap-4 sm:flex md:flex-row flex-col">
                          <Link
                            to={`/edit/${product._id}`}
                            className=" inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteproduct(product._id)}
                            className=" inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-300 hover:cursor-pointer active:border-r-4 transition-all border-indigo-500 active:border-b-4 "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>There is no product</>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomePage;

// 27:22
