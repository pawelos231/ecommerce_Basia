import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "../../styles/UserDetails/userDetails.module.sass";
import UserDetailsComponent from "../../components/UserDetails/userDetailsComponent";
import { fetchCart } from "../../actions/fetchcommerceCart";
import NestedLayout from "../../components/Layouts/layouUserInterface";
import { useTheme } from "next-themes";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <>
      <div className={styles.container} data-ison={theme}>
        <h1>Twoje zamówienia</h1>
        <UserDetailsComponent />
      </div>
    </>
  );
};

UserDetails.getLayout = (page: any) => {
  return <NestedLayout>{page}</NestedLayout>;
};

export default UserDetails;
