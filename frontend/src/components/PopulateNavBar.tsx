import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem"; // Fix spelling: NavItem should have an uppercase "I"
import NotificationBadge from "../components/notification/NotificationBadge"; // Import the new notification component
import { useEffect, useState } from "react";
import axios from "axios";

const PopulatedNavBar = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [moderatedCount, setModeratedCount] = useState(0);
  const [moderatedAndRejectedCount, setModeratedAndRejectedCount] = useState(0);

  useEffect(() => {
    // Use the environment variable for the API URL, fallback to localhost for development
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // Fetch the number of pending moderation articles
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/moderation/pending-count`);
        console.log("Full API response: ", response);
        setPendingCount(response.data); // Adjust based on the API response
        console.log("Pending count: ", response.data);
      } catch (err) {
        console.error("Error fetching pending moderation count", err);
      }
    };

    // Fetch moderated and rejected article count
    const fetchModeratedAndRejectedCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/submitter/moderated-rejected-count`);
        setModeratedAndRejectedCount(response.data);
        console.log("Rejected count: ", response.data);
      } catch (err) {
        console.error("Error fetching rejected article count", err);
      }
    };

    // Fetch moderated article count from the analysis API
    const fetchModeratedCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/analysis`);
        console.log("Full API response from analysis: ", response);
        setModeratedCount(response.data.length);
      } catch (err) {
        console.log("Error fetching moderated count from the analysis API", err);
      }
    };

    // Initial fetch of data
    fetchPendingCount();
    fetchModeratedCount();
    fetchModeratedAndRejectedCount();

    // Poll every 3 seconds to update the counts
    const pendingIntervalId = setInterval(fetchPendingCount, 1000);
    const moderatedIntervalId = setInterval(fetchModeratedCount, 1000);
    const moderatedAndRejectedId = setInterval(fetchModeratedAndRejectedCount, 3000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(pendingIntervalId);
      clearInterval(moderatedIntervalId);
      clearInterval(moderatedAndRejectedId);
    };

  }, []);

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
            {/* Display the red dot and count next to Analysis */}
            <NotificationBadge count={moderatedCount} />
          </NavItem>
          <NavItem route="/submitter">
            Submitter Dashboard
            {/* Display the count of notifications */}
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
