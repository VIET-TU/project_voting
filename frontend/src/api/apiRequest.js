import axios from "axios";

export const apiRequest = {
  // sign in

  registerUser: async (newUser, navigate) => {
    try {
      await axios.post("/v1/auth/register", newUser);
      alert("You are register success");
      navigate("/login");
    } catch (error) {
      alert("You  are register faild");
    }
  },

  loginUser: async (user, setCurrentUser, navigate) => {
    try {
      const res = await axios.post("/v1/auth/login", user);
      const data = await res.data;
      setCurrentUser(data);
      navigate("/");
    } catch (error) {
      alert("you entered the wrong username or password ");
    }
  },

  getAllGroupMember: async (currentUser, setAllMember) => {
    try {
      const res = await axios.get("/v1/group/", {
        headers: {
          token: currentUser.accessToken,
        },
      });
      const data = await res.data;
      setAllMember(data);
    } catch (error) {
      console.log(error);
    }
  },

  getAllUser: async (currentUser, setAllUser) => {
    try {
      const res = await axios.get("v1/user/", {
        headers: {
          token: currentUser.accessToken,
        },
      });
      const data = await res.data;
      setAllUser(data);
    } catch (error) {
      console.log(error);
    }
  },
  postCreatGroup: async (admin_group, currentUser, setAllMembers, navigate) => {
    try {
      const res = await axios.post("/v1/group/admin-member", admin_group, {
        headers: {
          token: currentUser.accessToken,
        },
      });
      const data = await res.data;
      setAllMembers(data);
      navigate("/home");
      navigate("/group");
    } catch (error) {
      alert("You are not allowed creat group");
    }
  },

  // deltete an member
  delteteAnMember: async (currentUser, idMember, setAllMember) => {
    try {
      const res = await axios.delete("/v1/group/delete-member/" + idMember, {
        headers: {
          token: currentUser.accessToken,
        },
      });
      const data = await res.data;
      alert("Delete member success");
      await apiRequest.getAllGroupMember(currentUser, setAllMember);
    } catch (error) {
      alert("You are not allowed delete member");
    }
  },

  // add new member
  postAddNewMember: async (
    currentUser,
    newMember,
    setListAddMembers,
    navigate
  ) => {
    try {
      await axios.post("/v1/group/user-member", newMember, {
        headers: {
          token: currentUser.accessToken,
        },
      });
      alert("Add member success");
      await apiRequest.getAllGroupMember(currentUser, setListAddMembers);
      navigate("/home");
      navigate("/group");
    } catch (error) {
      alert("You are not allowed add new member");
    }
  },

  // update member
  putUpdateMember: async (currentUser, idMember, setAllMember) => {
    try {
      await axios.put("/v1/group/" + idMember, {
        headers: currentUser.accessToken,
      });
      await apiRequest.getAllGroupMember(currentUser, setAllMember);
    } catch (error) {
      alert("You are not allowed update member");
    }
  },
};
