import Image from "next/dist/client/image";
import React from "react";

type Props = {
  productPhoto: string;
  productName: string;
};

export const TeaCard: React.FC<Props> = ({ productPhoto, productName }) => {
  return (
    <div className="product-card">
      <div className="card-header">
        <Image
          layout="fixed"
          src={productPhoto}
          width={230}
          height={230}
          alt="tea-photo"
        />
      </div>
      <div className="card-body">
        <div className="product-name">{productName}</div>
      </div>
    </div>
  );
};
