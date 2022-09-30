import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { server } from "../utility";
import Login from "../components/login";
import { setAllUserData, setAllCohortData } from "../redux/features/app-slice.js"
//=========================  LOGIN PAGE ==================
export default function Home() {
  const dispatch = useDispatch();
  const { allUsersData, allCohortsData } = useSelector(
    ({ app: { allUsersData, allCohortsData } }) => ({
      allUsersData,
      allCohortsData,
    })
  );

  useEffect(() => {
    (async () => {
      const allUsers = await (await fetch(`${server}/api/users`)).json();
      const allCohorts = await (await fetch(`${server}/api/cohorts`)).json();
      dispatch(setAllUserData(allUsers));
      dispatch(setAllCohortData(allCohorts));
    })();
  }, []);

  
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}
