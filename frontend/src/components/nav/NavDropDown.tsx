// **** Import React to use JSX (React components) ****
import React from "react";

// **** Import styles from the SCSS module for styling the dropdown container ****
import styles from "./Nav.module.scss";

// **** Define a type for the props, with `children` being optional (indicated by `?`) ****
// - `children?: React.ReactNode;` means that the `children` prop is optional. 
// - This allows you to use the component without passing any children, making it more flexible.
type Props = {
  children?: React.ReactNode; // The `?` makes `children` optional, meaning it's okay to pass no content.
};

// **** Functional component definition ****
// - This component accepts an optional `children` prop, which represents any content passed inside the component.
const NavDropdown = ({ children }: Props) => {
  // **** The component returns a <div> with the dropdown styles applied ****
  // - If `children` is provided, it will be rendered inside this div.
  return <div className={styles.dropdown_container}>{children}</div>;
};

// **** Export the component to be used in other files ****
export default NavDropdown;
