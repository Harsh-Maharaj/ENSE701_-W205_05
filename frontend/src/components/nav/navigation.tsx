import React from "react";
import NavBar from "./NavBar";
import NavItem from "./NavItem";
import NavDropdown from "./NavDropdown";
import styles from "./Nav.module.scss";

const Navigation = () => {
  return (
    <NavBar>
      {/* Regular Navigation Items */}
      <NavItem route="/articles">Articles</NavItem>
      <NavItem route="/new-article">New Article</NavItem>
      <NavItem route="/lookup-submission">Lookup Submission</NavItem>
      
      {/* Dropdown Example for Admin */}
      <div className={styles.dropdown}>
        <NavItem dropdown>Admin</NavItem>
        <NavDropdown>
          <NavItem route="/admin/dashboard">Dashboard</NavItem>
          <NavItem route="/admin/settings">Settings</NavItem>
        </NavDropdown>
      </div>

      {/* Dropdown Example for Rejected Articles */}
      <div className={styles.dropdown}>
        <NavItem dropdown>Rejected Articles</NavItem>
        <NavDropdown>
          <NavItem route="/rejected/view">View Rejected</NavItem>
          <NavItem route="/rejected/review">Review Rejected</NavItem>
        </NavDropdown>
      </div>

      {/* Dropdown Example for Moderator */}
      <div className={styles.dropdown}>
        <NavItem dropdown>Moderator</NavItem>
        <NavDropdown>
          <NavItem route="/moderator/articles">Moderate Articles</NavItem>
          <NavItem route="/moderator/settings">Moderator Settings</NavItem>
        </NavDropdown>
      </div>

      {/* Dropdown Example for Analyst */}
      <div className={styles.dropdown}>
        <NavItem dropdown>Analyst</NavItem>
        <NavDropdown>
          <NavItem route="/analyst/dashboard">Analytics Dashboard</NavItem>
          <NavItem route="/analyst/reports">Reports</NavItem>
        </NavDropdown>
      </div>
    </NavBar>
  );
};

export default Navigation;
