import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, setUsers } from "./userSlice";
import { Button, Card } from "react-bootstrap";
 import { Image } from "react-bootstrap";
 import { FaUserSlash } from "react-icons/fa";
 import "./editUser.css"
const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      dispatch(setUsers(JSON.parse(storedUsers)));
    }
  }, [dispatch]);

  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id }));
 
    localStorage.setItem(
      "users",
      JSON.stringify(users.filter((user) => user.id !== id))
    );
  };

  const renderCard = () =>
    users.map((user) => (
      <Card className="mb-3" key={user.id} >
        <div style={{marginLeft:"400px",width:"300px", color:"white",}} >
             <Card.Body style={{backgroundColor:"#007bff",width:"600px",}}>
          <Image
            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
            alt="avatar"
            roundedCircle
            width={70}
            height={70}
            style={{ float: "right" }}
          />
              <span style={{ float: "left" }}>{user.name}
        </span>
          <Card.Text>
            <strong>firstName:</strong> {user.firstName}
          </Card.Text>
          <Card.Text>
            <strong>lastName:</strong> {user.lastName}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <Card.Text>
            <strong>Number:</strong> {user.phone}
          </Card.Text>
          <Card.Text>
            <strong>Gender:</strong> {user.gender}
          </Card.Text>
          <Card.Text>
            <strong>birth Date:</strong> {user.birthDate}
          </Card.Text>
          <Card.Text>
            <strong>Age:</strong> {user.age}
          </Card.Text>
          {/* <Card.Text>
            <strong>interests:</strong> {user.languages}
          </Card.Text> */}
          <Card.Text>
            <strong>Marital Status:</strong> {user.maritalStatus}
          </Card.Text>
          {user.maritalStatus === "married" && (
            <>
              <Card.Text>
                <strong>Spouse Name:</strong> {user.spouseName}
              </Card.Text>
              <Card.Text>
                <strong>Spouse Number:</strong> {user.spousePhone}
              </Card.Text>
              <Card.Text>
                <strong>Spouse Enail:</strong> {user.spouseEmail}
              </Card.Text>
            </>
          )}
    
        </Card.Body>
        <Card.Footer>
          <Link to={`edit-user/${user.id}`} className="btn btn-primary me-2">
            Edit
          </Link>
          <Button variant="danger" onClick={() => handleRemoveUser(user.id)}>
            Delete
          </Button>
        </Card.Footer>
        </div>
      </Card>
    ));

  return (
    <div>
    <Link to="/add-user" className="btn btn-primary mb-3 custom-btn">
      Add User
    </Link>
    {users?.length ? (
      renderCard()
    ) : (
      <div className="d-flex align-items-center justify-content-center custom-icon">
      <FaUserSlash size={64} />
      <p className="ms-2 mb-0 text-center">
        No users found
        </p>
    </div>
  )}
</div>
    
  );
};

export default UserList;
