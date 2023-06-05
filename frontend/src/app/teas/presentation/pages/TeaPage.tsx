import React from "react";
import { TeaCard } from "../components/TeaCard";
import { Tea } from "../../domain/tea";

type Props = {
  data: Tea[];
};

export const TeaPage: React.FC<Props> = ({ data }) => {
  data = [
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/imagetea.png",
      created_at: new Date(2012, 1, 1),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/imagetea.png",
      created_at: new Date(2012, 1, 1),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/imagetea.png",
      created_at: new Date(2012, 1, 1),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/imagetea.png",
      created_at: new Date(2012, 1, 1),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/imagetea.png",
      created_at: new Date(2012, 1, 1),
    },
  ];

  return (
    <div className="custom-container">
      <h1 className="text-3xl mb-10 title-products-list">Our beloved coffee</h1>
      <p className="mb-10">
        Hand-picked, made with love, curated, call it what you want. But we
        promise you, this will be the best coffe of your life.
      </p>
      <div className="coffees">
        {data.map((coffee, key) => (
          <TeaCard
            key={key}
            productName={coffee.name}
            productPhoto={coffee.picture}
          />
        ))}
      </div>
    </div>
  );
};
