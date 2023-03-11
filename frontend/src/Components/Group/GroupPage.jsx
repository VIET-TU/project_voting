import { useEffect, useState } from "react";
import {
  HiPlusCircle,
  HiOutlineX,
  HiMenu,
  HiUserAdd,
  HiUser,
  HiUserRemove,
} from "react-icons/hi";
import { apiRequest } from "../../api/apiRequest";
import { useAllUsers } from "../../context/allUsers-context";
import { useLoginUser } from "../../context/login-content";
import { useNavigate } from "react-router-dom";
import "./group.css";
import { useListMembers } from "../../context/listMembers-constext";

const GroupPage = () => {
  const [allUser, setAllUser] = useAllUsers();
  const [title, setTtile] = useState("");
  const [desc, setDesc] = useState(" ");
  const [isDesc, setIsDesc] = useState(false);
  const [listMembers, setListMembers] = useListMembers();
  const navigate = useNavigate();
  const [currentUser] = useLoginUser();
  const [isCreat, setIsCreat] = useState(false);
  const [isAdddMember, setIsAdddMember] = useState(false);
  const [listAddMembers, setListAddMembers] = useState([]);
  const [inforMember, setInforMember] = useState();
  const [isInfor, setIsinfor] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!(Object.keys(currentUser).length > 0)) {
      return navigate("/login");
    }
    await apiRequest.getAllUser(currentUser, setAllUser);
    await apiRequest.getAllGroupMember(currentUser, setListMembers);
  }, [currentUser, navigate, setAllUser, setListMembers]);

  const handleCreatGroup = async () => {
    setIsCreat((pre) => !pre);
  };
  const handleSubmitCreatGroup = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const _idUser = e.target.group_admin.value;


    if (!title || !description || _idUser === "null") {
      alert("Enter the missing information");
      return;
    }

    const admin_group = {
      title,
      description,
      user: _idUser,
    };
    await apiRequest.postCreatGroup(
      admin_group,
      currentUser,
      setListMembers,
      navigate
    );
  };

  const getInfoUser = (_id) => {
    if (allUser) {
      return allUser?.filter((item) => {
        return item._id === _id;
      });
    }
  };

  const getTitle = () => {
    if (listMembers.length > 0 && !title.length) {
      listMembers.forEach((item) => {
        if (item.title?.length > 0) {
          setTtile(item.title);
          setDesc(item.description);
        }
      });
    } else if (!listMembers.length) {
      setTtile("");
      setDesc("");
    }
  };
  const handleDeleteUser = async (e) => {
    const idMember = e.currentTarget.dataset.id;

    await apiRequest.delteteAnMember(currentUser, idMember, setListMembers);
  };

  useEffect(() => {
    if (allUser && listMembers.length) {
      const list = allUser.filter((a) => {
        return !listMembers?.find((b) => {
          return a._id === b.user;
        });
      });
      setListAddMembers(list);
      return;
    }
  }, [listMembers, allUser]);

  const handleAddMember = (e) => {
    const newMember = {
      user: e.currentTarget.dataset.iduser,
    };
    apiRequest.postAddNewMember(
      currentUser,
      newMember,
      setListAddMembers,
      navigate
    );
  };

  const handleUpdateMember = (e) => {
    const id = e.currentTarget.dataset.idmember;
    apiRequest.putUpdateMember(currentUser, id, setListAddMembers);
  };

  const handleGetDescription = () => {
    setIsDesc((pre) => !pre);
  };

  const handleGetInforMember = (e) => {
    const member = allUser.filter((item) => {
      return item._id === e.currentTarget.dataset.idmember;
    });
    setInforMember(member);

    setIsinfor((pre) => !pre);
  };

  return (
    <div className="container-group">
      {!listMembers.length && !isCreat && (
        <div className="creat-group " onClick={handleCreatGroup}>
          <HiPlusCircle className="icon-plus" />
          <h1 className="">Creat Group </h1>
        </div>
      )}

      {isCreat && !listMembers.length && (
        <div className="creat-group-detail">
          <div className="group-detail-header">
            <h2>Creat group</h2>
            <HiOutlineX
              onClick={handleCreatGroup}
              className="remove-group-deltail"
            />
          </div>

          <form onSubmit={handleSubmitCreatGroup} className="form-creat-group">
            <div className="wrap-title">
              <label htmlFor="title">Title group</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter your title"
              />
            </div>
            <div className="wrap-desc">
              <label htmlFor="description">Description group</label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter you description"
                rows="6"
              ></textarea>
            </div>
            <div className="wrap-select-admin-group">
              <label htmlFor="group-admin">Select admin group</label>
              <select
                id="group-admin"
                className="select-group-admin"
                name="group_admin"
              >
                <option value="null" select>
                  null
                </option>
                {allUser &&
                  allUser?.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.firstname +
                          " " +
                          item.lastname +
                          " - " +
                          item.email}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button type="Submit" className="save-group">
              Save
            </button>
          </form>
        </div>
      )}

      {listMembers.length > 0 && (
        <div className="group-detail">
          <div className="group-detail-header">
            {getTitle()}
            <h1 className="group-title">{title}</h1>
            <span onClick={handleGetDescription} style={{ cursor: "pointer" }}>
              <HiMenu className="group-detail-desc" />
            </span>
          </div>
          <div className="group-detail-members">
            <h3 style={{ margin: "0 auto", with: "max-contnet" }}>
              List members
            </h3>
            <ul className="list-member-group">
              {listMembers?.map((item, index) => {
                const member = getInfoUser(item.user);

                return (
                  <li className="member-group" key={index}>
                    <span className="name-email-member">
                      <span>
                        {member[0]?.firstname + " " + member[0]?.lastname}
                      </span>
                      {" - "}
                      <span>{member[0]?.email}</span>
                    </span>
                    <span className="member-config">
                      <span
                        data-idMember={item._id}
                        onClick={handleUpdateMember}
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          padding: "2px",
                          borderRadius: "5px",
                          opacity: "0.5",
                        }}
                        className={member[0]?.role === 2 ? "admin" : "user"}
                      >
                        {member[0]?.role === 2 ? "Admin" : "User"}
                      </span>
                      <span
                        data-idMember={item.user}
                        onClick={handleGetInforMember}
                      >
                        <HiUser />
                      </span>
                      <span data-id={item._id} onClick={handleDeleteUser}>
                        <HiUserRemove />
                      </span>
                    </span>
                  </li>
                );
              })}
              {listAddMembers.length && (
                <li
                  className="member-group add-user-group"
                  onClick={() => {
                    setIsAdddMember((pre) => !pre);
                  }}
                >
                  <HiUserAdd style={{ margin: "0 auto", fontSize: "25px" }} />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {isAdddMember && (
        <div className="wrap-addMeber">
          <div className="addMeber">
            <div className="header-addMember">
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  paddingBottom: "5px",
                  borderBottom: "1px solid gray",
                }}
              >
                List add Member
              </h3>
              <div
                className="remove-addMember"
                onClick={() => setIsAdddMember((pre) => !pre)}
              >
                <HiOutlineX></HiOutlineX>
              </div>
              <ul className="list-addMenber">
                {listAddMembers?.map((item) => {
                  return (
                    <li className="itme-addMember" key={item._id}>
                      <span>
                        {item.firstname +
                          " " +
                          item.lastname +
                          " - " +
                          item.email}
                      </span>
                      <span data-idUser={item._id} onClick={handleAddMember}>
                        <HiUserAdd
                          style={{ fontSize: "25=0px", cursor: "pointer" }}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      {isDesc && (
        <div className="wrap-addMeber">
          <div className="addMeber">
            <div className="header-addMember">
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  paddingBottom: "5px",
                  borderBottom: "1px solid gray",
                }}
              >
                Description group
              </h3>
              <div
                className="remove-addMember"
                onClick={() => setIsDesc((pre) => !pre)}
              >
                <HiOutlineX></HiOutlineX>
              </div>

              <p
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        </div>
      )}
      {isInfor && (
        <div className="wrap-addMeber">
          <div className="addMeber">
            <div className="header-addMember">
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  paddingBottom: "5px",
                  borderBottom: "1px solid gray",
                }}
              >
                Information member
              </h3>
              <div
                className="remove-addMember"
                onClick={() => setIsinfor((pre) => !pre)}
              >
                <HiOutlineX></HiOutlineX>
              </div>

              <ul
                style={{
                  margin: "20px auto 0px",
                  // width: "max-content",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "20px",
                }}
              >
                <li>id: {inforMember[0]._id}</li>
                <li>FirstName: {inforMember[0].firstname}</li>
                <li>LastName: {inforMember[0].lastname}</li>
                <li>Email: {inforMember[0].email}</li>
                <li>Role: {inforMember[0].role === 2 ? "Admin" : "User"}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
