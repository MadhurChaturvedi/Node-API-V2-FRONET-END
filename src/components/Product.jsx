import React from "react";

function Product({ product }) {
  return (
    <div className=" bg-red-50" key={index}>
      {product.name}
    </div>
  );
}

export default Product;
