import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { addUser, deleteUser, fetchUsers, updateUser } from "../utils/helpers";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    addUser(newUser)
      .then((response) => {
        setUsers([...users, response]);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
        });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditedUserInfo({
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      email: userToEdit.email,
    });
  };

  const handleUpdateUser = () => {
    updateUser(editingUserId, editedUserInfo)
      .then(() => {
        setEditingUserId(null);
        loadUsers();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const isEditing = (userId) => userId === editingUserId;
  const getData = JSON.parse(localStorage.getItem("user_login"));

  const isAdmin = getData && getData.isAdmin;
  console.log(isAdmin, "this is data");
  return (
    <Grid container spacing={3} style={{ marginTop: "20px" }}>
      {isAdmin ? (
        <>
          <Grid item xs={12} sm={6}>
            <Box p={4}>
              <Typography variant="h5">Add User</Typography>
              <Paper elevation={4} style={{ padding: "20px" }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddUser}
                  style={{ marginTop: "20px" }}
                >
                  Add User
                </Button>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "30px" }}>
            <Box p={2}>
              {loading ? (
                <CircularProgress />
              ) : users.length === 0 ? (
                <Typography variant="h6">No users found</Typography>
              ) : (
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <List>
                    {users.map((user) => (
                      <ListItem key={user.id} disablePadding>
                        {isEditing(user.id) ? (
                          <>
                            <TextField
                              label="First Name"
                              variant="outlined"
                              margin="normal"
                              name="firstName"
                              value={editedUserInfo.firstName}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  firstName: e.target.value,
                                })
                              }
                            />
                            <TextField
                              label="Last Name"
                              variant="outlined"
                              margin="normal"
                              name="lastName"
                              value={editedUserInfo.lastName}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  lastName: e.target.value,
                                })
                              }
                            />
                            <TextField
                              label="Email"
                              variant="outlined"
                              margin="normal"
                              name="email"
                              value={editedUserInfo.email}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  email: e.target.value,
                                })
                              }
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleUpdateUser}
                              style={{ marginTop: "10px" }}
                            >
                              Update
                            </Button>
                          </>
                        ) : (
                          <>
                            <ListItemText
                              primary={`${user.firstName} ${user.lastName}`}
                            />
                            <Button onClick={() => handleEditClick(user.id)}>
                              Edit
                            </Button>
                            <Button onClick={() => handleDeleteUser(user.id)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box p={2}>
            <Typography variant="h6" color="error">
              You do not have permission to view this page!
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Users;
