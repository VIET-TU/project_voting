import { useLoginUser } from "../../context/login-content";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useListMembers } from "../../context/listMembers-constext";
import { useEffect } from "react";

const HomePage = () => {
  // const [currentUser] = useLoginUser();
  const [listMembers] = useListMembers();
  const [currentUser] = useLoginUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(Object.keys(currentUser).length > 0)) {
      return navigate("/login");
    }
  }, []);

  return <div>{JSON.stringify(listMembers)}</div>;
};

export default HomePage;
