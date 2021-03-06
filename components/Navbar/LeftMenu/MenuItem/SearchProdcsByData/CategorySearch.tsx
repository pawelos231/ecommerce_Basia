import { motion } from "framer-motion";
import styles from "../../../../../styles/navbars/leftMenuNavbar.module.sass";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { FetchProductByCategory } from "../../../../../actions/ProductsAction";
const CategorySearch = ({ variants, ArrayOfCategories, data }) => {
  const dispatch = useDispatch();
  const color = "#D309E1";
  const style = { border: `2px solid ${color}`, zIndex: 9999 };
  const val2: any = useSelector((state: RootStateOrAny) => {
    return state;
  });
  const mutable: Object = val2.ProductsHandle.prodcs;
  const OnChangeSelectHandler = (e: any): void => {
    dispatch(FetchProductByCategory(data, mutable, e.target.value));
  };
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      className={styles.TextPlaceHolder}
    >
      <select
        onChange={OnChangeSelectHandler}
        style={style}
        className={styles.iconPlaceholder}
      >
        {ArrayOfCategories.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </motion.div>
  );
};

export default CategorySearch;
