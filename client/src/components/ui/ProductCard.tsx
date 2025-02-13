import React from "react";

interface ProductData {
  image_path: string;
  dmctg: string;
  odDmCd: string;
  currentGoldPrice: number;
  netWt: number;
  grossWt: number;
  cdCertNo: string;
  huidNo: string;
  igino: string;
  ordNo: string;
}

const ProductCard: React.FC<{ productData: ProductData }> = ({
  productData,
}) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-2xl">
      {" "}
      {/* Tailwind classes */}
      <img
        src={productData.image_path}
        alt={productData.dmctg}
        className="w-48 h-48 object-contain mr-4 rounded-lg" // object-contain prevents cropping
      />
      <div>
        <h3 className="text-lg font-medium mb-2">{productData.dmctg}</h3>
        <div className="flex flex-wrap">
          {" "}
          {/* Arrange details side-by-side */}
          <div className="w-1/2 pr-2">
            <p className="text-gray-600 text-sm mb-1">
              Product Code: {productData.odDmCd}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Net Weight: {productData.netWt} g
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Certificate No: {productData.cdCertNo}
            </p>
            <p className="text-gray-600 text-sm">
              HUID No: {productData.huidNo}
            </p>
          </div>
          <div className="w-1/2 pl-2">
            <p className="text-gray-600 text-sm mb-1">
              Gross Weight: {productData.grossWt} g
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Current Gold Price: ₹{productData.currentGoldPrice.toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              IGINO: {productData.igino}
            </p>
            <p className="text-gray-600 text-sm">
              Order No: {productData.ordNo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
