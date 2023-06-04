import React from "react";
import { Coffee } from "../../domain/coffee";
import { CoffeeCard } from "../components/CoffeeCard";

type Props = {
  data: Coffee[];
};

export const CoffeePage: React.FC<Props> = ({ data }) => {
  data = [
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      type: "ROBUSTA",
      created_at: new Date(),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      type: "ROBUSTA",
      created_at: new Date(),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      type: "ROBUSTA",
      created_at: new Date(),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      type: "ROBUSTA",
      created_at: new Date(),
    },
    {
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      type: "ROBUSTA",
      created_at: new Date(),
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
          <CoffeeCard
            key={key}
            productName={coffee.name}
            productType={coffee.type}
            productPhoto={coffee.picture}
          />
        ))}
      </div>
    </div>
  );
};
