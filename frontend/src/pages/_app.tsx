import "../core/styles/globals.css";
import type { AppProps } from "next/app";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
}
export default MyApp;
