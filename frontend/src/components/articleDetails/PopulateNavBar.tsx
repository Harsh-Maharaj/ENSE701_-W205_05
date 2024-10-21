import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem"; // Fix spelling: NavItem should have an uppercase "I"
import NotificationBadge from "../components/notification/NotificationBadge"; // Import the new notification component
import { useEffect, useState } from "react";
import axios from "axios";

const PopulatedNavBar = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [moderatedCount, setModeratedCount] = useState(0);
  const [moderatedAndRejectedCount, setModeratedAndRejectedCount] = useState(0);

  // Fetch the backend URL from environment variables
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Fetch the number of pending moderation articles
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/moderation/pending-count`);
        console.log("Full API response: ", response);
        setPendingCount(response.data); // Adjust based on the API response
        console.log("Pending count checking: ", response.data);
      } catch (err) {
        console.error("Error fetching pending moderation count", err);
      }
    };

    const fetchModeratedAndRejectedCount  = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/submitter/moderated-rejected-count`);
        setModeratedAndRejectedCount(response.data); 
        console.log("Rejected count checking: ", response.data);
      } catch (err) {
        console.error("Error fetching rejected article count", err);
      }
    };

    const fetchModeratedCount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/analysis`);
        console.log("Full API response 22222: ", response);
        setModeratedCount(response.data.length);
      } catch (err) {
        console.log("Error fetching moderated count from the analysis API", err);
      }
    };

    // Initial fetch
    fetchPendingCount();
    fetchModeratedCount();
    fetchModeratedAndRejectedCount();

    // Poll every 3 seconds
    const pendingIntervalId = setInterval(fetchPendingCount, 1000);
    const moderatedIntervalId = setInterval(fetchModeratedCount, 1000);
    const moderatedAndRejectedId = setInterval(fetchModeratedAndRejectedCount, 3000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pendingIntervalId);
      clearInterval(moderatedIntervalId);
      clearInterval(moderatedAndRejectedId);
    };
  }, [backendUrl]);

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>

      <NavItem route="/" end>
        Home
      </NavItem>

      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View Articles</NavItem>
          <NavItem route="/articles/new">Submit New</NavItem>
        </NavDropdown>
      </NavItem>

      {/* New dropdown for admin/moderation related pages */}
      <NavItem dropdown route="/admin">
        Admin <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/moderation">
            Moderation
            {/* Display the red dot and count next to Moderation */}
            <NotificationBadge count={pendingCount} />
          </NavItem>
          <NavItem route="/analysis">
            Analysis
            {/* Display the red dot and waiting for analysis count next to Analysis */}
            <NotificationBadge count={moderatedCount} />
          </NavItem>
          <NavItem route="/submitter">
            Submitter Dashboard
            {/* Show the count of notifications */}
            <NotificationBadge count={moderatedAndRejectedCount} />
          </NavItem>
          <NavItem route="/admin">Admin Dashboard</NavItem>
          <NavItem route="/search">Search</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
