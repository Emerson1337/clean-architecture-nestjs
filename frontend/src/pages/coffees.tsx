import React from "react";
import { fetchCoffeeService } from "../app/coffees/application/fetchCoffeeService";
import { CoffeeMapper } from "../app/coffees/infrastructure/coffee.mapper";
import { CoffeePage } from "../app/coffees/presentation/pages/CoffeePage";
import { Navbar } from "../app/interface/presentation/pages/Navbar";

export async function getStaticProps(): Promise<any> {
  const data = await fetchCoffeeService();
  return {
    props: {
      data,
    },
  };
}

export default function Index({ data }: any): JSX.Element {
  const domainData = data.map(CoffeeMapper.toDomain);
  return (
    <>
      <Navbar buttons={["Our Coffee", "Our Tea"]} />
      <CoffeePage data={domainData} />
    </>
  );
}
