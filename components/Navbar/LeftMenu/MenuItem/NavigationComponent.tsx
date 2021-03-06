import { motion, Variants } from "framer-motion";
import styles from "../../../../styles/navbars/leftMenuNavbar.module.sass";
import DateSearch from "./SearchProdcsByData/AddDateSearch";
import CategorySearch from "./SearchProdcsByData/CategorySearch";
import PriceSearch from "./SearchProdcsByData/PriceSearch";
const variants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const variantsForChildren: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
const Navigation = ({ ArrayOfCategories, data }) => {
  return (
    <motion.div variants={variants} className={styles.ConForUl}>
      <PriceSearch variants={variantsForChildren} data={data} />
      <CategorySearch
        variants={variantsForChildren}
        ArrayOfCategories={ArrayOfCategories}
        data={data}
      />
      <DateSearch variants={variantsForChildren} />
    </motion.div>
  );
};

export default Navigation;
