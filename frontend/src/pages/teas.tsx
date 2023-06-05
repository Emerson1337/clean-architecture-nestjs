import React, { useEffect, useState } from "react";
import { fetchCoffeeService } from "../app/coffees/application/fetchCoffeeService";
import { CoffeeMapper } from "../app/coffees/infrastructure/coffee.mapper";
import { Navbar } from "../app/interface/presentation/pages/Navbar";
import { TeaPage } from "../app/teas/presentation/pages/TeaPage";
import { menuPaths } from "../shared/contants/menuPaths";
import Spinner from "../app/interface/presentation/components/Spinner";

export async function getStaticProps(): Promise<any> {
  const data = await fetchCoffeeService();
  return {
    props: {
      data,
    },
  };
}

export default function Index({ data }: any): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const domainData = data.map(CoffeeMapper.toDomain);
  return (
    <>
      <Navbar buttons={menuPaths} />

      {isLoading ? (
        <div className="load-screen">
          <Spinner />
        </div>
      ) : (
        <TeaPage data={domainData} />
      )}
    </>
  );
}
