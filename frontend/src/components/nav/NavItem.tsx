import { useRouter } from "next/router";
import React from "react";
import styles from "./Nav.module.scss";

type Props = {
  route?: string;
  children: React.ReactNode;
  end?: boolean;
  dropdown?: boolean;
  onClick?: boolean | (() => void);
  style?: React.CSSProperties;
};

const NavItem = ({ children, route, end, dropdown, onClick, style }: Props) => {
  const router = useRouter();

  const navigate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (typeof route === "string") {
      router.push(route);
      event.stopPropagation();
    }
  };

  return (
    <div
      style={style}
      className={`${styles.navitem}${dropdown ? ` ${styles.dropdown}` : ""}${
        route || onClick ? ` ${styles.clickable}` : ""
      }${end ? ` ${styles.end}` : ""}`}
      onClick={typeof onClick === "function" ? onClick : navigate}
    >
      {children}
    </div>
  );
};

export default NavItem;
