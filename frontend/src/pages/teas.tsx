import React, { useEffect, useState } from "react";
import { Navbar } from "@app/interface/presentation/pages/Navbar";
import { TeaPage } from "@app/teas/presentation/pages/TeaPage";
import { menuPaths } from "@shared/contants/menuPaths";
import Spinner from "@app/interface/presentation/components/Spinner";
import { fetchTeaService } from "@app/teas/application/fetchTeaService";
import { TeaMapper } from "@app/teas/infrastructure/tea.mapper";
import { motion } from "framer-motion";

export default function Index(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchTeaService());
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const domainData = data.map(TeaMapper.toDomain);
  return (
    <>
      <Navbar buttons={menuPaths} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="load-screen">
            <Spinner />
          </div>
        ) : (
          <TeaPage data={domainData} />
        )}
      </motion.div>
    </>
  );
}
