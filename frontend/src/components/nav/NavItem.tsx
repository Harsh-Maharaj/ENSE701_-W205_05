import { useRouter } from "next/router";
import React from "react";
import styles from "./Nav.module.scss";

type Props = {
  route?: string;
  children: React.ReactNode;
};

const NavItem = ({ route, children }: Props) => {
  const router = useRouter();

  const handleNavigation = () => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <div onClick={handleNavigation} className={styles.navitem}>
      {children}
    </div>
  );
};

export default NavItem;
