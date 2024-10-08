// **** Import necessary modules ****
// - `useRouter` from Next.js allows navigation between pages.
// - `React` for JSX components.
import { useRouter } from "next/router";
import React from "react";

// **** Import SCSS styles for the NavItem component ****
import styles from "./Nav.module.scss";

// **** Define the type for the props the component will accept ****
// - `route`: Optional, a string representing the URL to navigate to.
// - `children`: Required, the content to be rendered inside the NavItem.
// - `end`: Optional, a boolean to apply a specific style if it's the last item.
// - `dropdown`: Optional, a boolean to apply a dropdown style.
// - `onClick`: Optional, either a boolean or a function to handle click events.
// - `style`: Optional, an inline style object.
type Props = {
  route?: string; // The URL to navigate to when the item is clicked (optional).
  children: React.ReactNode; // Content to display inside the NavItem (required).
  end?: boolean; // Adds a specific style if the NavItem is the last one (optional).
  dropdown?: boolean; // Adds a dropdown style if true (optional).
  onClick?: boolean | (() => void); // Custom click event handler or navigation trigger (optional).
  style?: React.CSSProperties; // Inline styles for customization (optional).
};

// **** Functional component NavItem ****
// - Handles navigation and optional click events for the navigation item.
const NavItem = ({ children, route, end, dropdown, onClick, style }: Props) => {
  // **** Initialize Next.js router for navigation ****
  const router = useRouter();

  // **** Handle navigation on click ****
  // - If a `route` prop is provided and is a string, navigate to that route using Next.js router.
  // - The `event.stopPropagation()` prevents click events from bubbling up to parent elements.
  const navigate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (typeof route === "string") {
      router.push(route); // Navigate to the given route
    }
    event.stopPropagation(); // Stop the event from propagating to parent elements
  };

  // **** Return JSX to render the NavItem ****
  return (
    <div
      style={style} // Apply optional inline styles if provided
      // **** Apply different CSS classes based on the props ****
      // - If `route` or `onClick` exists, apply the `clickable` style.
      // - If `end` is true, add the `end` style.
      // - If `dropdown` is true, add the `dropdown` style.
      className={`${route || onClick ? styles.clickable : styles.navitem}${
        end ? ` ${styles.end}` : ""
      }${dropdown ? ` ${styles.dropdown}` : ""}`}
      
      // **** Handle the click event ****
      // - If `onClick` is a function, use it; otherwise, use the default `navigate` function.
      onClick={typeof onClick === "function" ? onClick : navigate}
    >
      {children} {/* Render the content inside the NavItem (e.g., text or icons) */}
    </div>
  );
};

// **** Export the NavItem component to be used in other parts of the app ****
export default NavItem;
