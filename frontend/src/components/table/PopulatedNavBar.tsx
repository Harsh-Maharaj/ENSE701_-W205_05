import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "../nav/NavBar"; // Corrected path
import NavDropdown from "../nav/NavDropDown"; // Corrected path
import NavItem from "../nav/NavItem"; // Corrected path

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Submit new</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
