/*********************************************
 * Import React for using JSX (React components).
 * While newer React setups don't require importing React,
 * it's still a common practice, especially in TypeScript.
 *********************************************/
import React from "react";

/*********************************************
 * Import styles from the SCSS module.
 * - SCSS allows for more powerful styling and modular CSS.
 * - `Nav.module.scss` is scoped only to this component.
 *********************************************/
import styles from "./Nav.module.scss";

/*********************************************
 * type Props = {}: Think of this as creating a template or a form that says "here’s what we expect for this component."
 * children: React.ReactNode: This part says, "We expect the children prop to be anything that React can show on the screen, whether it’s text, HTML, or other components."
 *  Props is like saying:
"Hey, NavBar component! You’re going to get something called children, and that could be text, elements, or other components."
 *********************************************/
type Props = {
  children: React.ReactNode; // React.ReactNode represents any valid JSX or element
};

/*********************************************
 * NavBar Functional Component -- the variable hold a function.
 * : React.FC<Props>: This tells TypeScript that NavBar is a React Functional Component
 * react.FC is a special type for functional components in React.
 * Props: This is the type alias you defined earlier, specifying that the component will receive a children prop (the content to be placed inside the component).
 * ({ children }: Props):  This part means you are receiving an object (the props) that follows the structure of the Props type.
 * you are using destructuring to pull out the children property directly from the props object.
 * children is just a variable name.
 * 
 * example: 
 * {/* Using the NavBar component */
//  <NavBar>
//  {/* Whatever you put here will be passed as `children` */}
//  <a href="#home">Home</a>
//  <a href="#about">About</a>
//  <a href="#contact">Contact</a>
// </NavBar>
//  *********************************************/
const NavBar: React.FC<Props> = ({ children }: Props) => {
  /*********************************************
   * JSX for rendering the NavBar component:
   * - The `className` attribute applies the SCSS style for the navbar.
   * - The `children` prop is used to insert any nested content 
   *   passed inside the <NavBar> component.
   *********************************************/
  return (
    <nav className={styles.navbar}>
      {children} {/* Render the passed children inside the <nav> tag */}
    </nav>
  );
};

/*********************************************
 * Export the NavBar component so it can be 
 * imported and used in other components or pages.
 *********************************************/
export default NavBar;


//React.FC---if i explicitily use this, i don't need to initialize children in the prop type and the type script will automatiically include it in the component, but if i dont use React.FC, i need to explicitly initialize children in the prop if i need it.
