import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { editUser } from "./userSlice";
import { Button, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const navigate = useNavigate();

  const existingUser = users.find((user) => user.id === params.id);

  const [showSpouseFields, setShowSpouseFields] = useState(existingUser?.maritalStatus === "married");

  const initialValues = {
    firstName: existingUser?.firstName || "",
    lastName: existingUser?.lastName || "",
    birthDate: existingUser?.birthDate || "",
    gender: existingUser?.gender || "",
    age: existingUser?.age || "",
    email: existingUser?.email || "",
    phone: existingUser?.phone || "",
    maritalStatus: existingUser?.maritalStatus || "",
    spouseName: existingUser?.spouseName || "",
    spouseEmail: existingUser?.spouseEmail || "",
    spousePhone: existingUser?.spousePhone || "",
    interests: existingUser?.interests || [],
  };

  const handleEditUser = (values) => {
    dispatch(editUser({ id: params.id, ...values }));

    const updatedUsers = users.map((user) =>
      user.id === params.id ? { ...user, ...values } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    navigate("/");
  };

  const handleMaritalStatusChange = (e, setFieldValue) => {
    const selectedMaritalStatus = e.target.value;
    setShowSpouseFields(selectedMaritalStatus === "married");
    setFieldValue("maritalStatus", selectedMaritalStatus);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.firstName)) {
      errors.firstName = "Only letters and spaces are allowed";
    }

    if (!values.lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.lastName)) {
      errors.lastName = "Only letters and spaces are allowed";
    }

    if (!values.birthDate) {
      errors.birthDate = "Birth Date is required";
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    if (!values.age) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(values.age)) {
      errors.age = "Age should be a number";
    } else if (values.age < 0 || values.age > 100) {
      errors.age = "Age should be between 0 and 100";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Invalid phone number format";
    }

    if (showSpouseFields) {
      if (!values.spouseName.trim()) {
        errors.spouseName = "Spouse Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(values.spouseName)) {
        errors.spouseName = "Only letters and spaces are allowed";
      }

      if (!values.spouseEmail.trim()) {
        errors.spouseEmail = "Spouse Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.spouseEmail)) {
        errors.spouseEmail = "Invalid email format";
      }

      if (!values.spousePhone.trim()) {
        errors.spousePhone = "Spouse Phone Number is required";
      } else if (!/^\d{10}$/.test(values.spousePhone)) {
        errors.spousePhone = "Invalid phone number format";
      }
    }

    return errors;
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={6}>
          <Formik initialValues={initialValues} onSubmit={handleEditUser} validate={validateForm}>
            {({ values, setFieldValue, errors }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      variant="filled"
                      fullWidth
                      value={values.firstName}
                      onChange={(e) => setFieldValue("firstName", e.target.value)}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      variant="filled"
                      fullWidth
                      value={values.lastName}
                      onChange={(e) => setFieldValue("lastName", e.target.value)}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="birthDate"
                      variant="filled"
                      fullWidth
                      type="date"
                      value={values.birthDate}
                      onChange={(e) => setFieldValue("birthDate", e.target.value)}
                      error={Boolean(errors.birthDate)}
                      helperText={errors.birthDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="gender">Gender</InputLabel>
                      <Select
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={(e) => setFieldValue("gender", e.target.value)}
                        label="Gender"
                        error={Boolean(errors.gender)}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="age"
                      label="Age"
                      variant="filled"
                      fullWidth
                      type="number"
                      value={values.age}
                      onChange={(e) => setFieldValue("age", e.target.value)}
                      error={Boolean(errors.age)}
                      helperText={errors.age}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="filled"
                      fullWidth
                      type="email"
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      variant="filled"
                      fullWidth
                      type="tel"
                      value={values.phone}
                      onChange={(e) => setFieldValue("phone", e.target.value)}
                      error={Boolean(errors.phone)}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="maritalStatus">Marital Status</InputLabel>
                      <Select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={values.maritalStatus}
                        onChange={(e) => handleMaritalStatusChange(e, setFieldValue)}
                        label="Marital Status"
                        error={Boolean(errors.maritalStatus)}
                      >
                        <MenuItem value="">Select Marital Status</MenuItem>
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {showSpouseFields && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          name="spouseName"
                          label="Spouse Name"
                          variant="filled"
                          fullWidth
                          value={values.spouseName}
                          onChange={(e) => setFieldValue("spouseName", e.target.value)}
                          error={Boolean(errors.spouseName)}
                          helperText={errors.spouseName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="spouseEmail"
                          label="Spouse Email"
                          variant="filled"
                          fullWidth
                          type="email"
                          value={values.spouseEmail}
                          onChange={(e) => setFieldValue("spouseEmail", e.target.value)}
                          error={Boolean(errors.spouseEmail)}
                          helperText={errors.spouseEmail}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="spousePhone"
                          label="Spouse Phone Number"
                          variant="filled"
                          fullWidth
                          type="tel"
                          value={values.spousePhone}
                          onChange={(e) => setFieldValue("spousePhone", e.target.value)}
                          error={Boolean(errors.spousePhone)}
                          helperText={errors.spousePhone}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditUser;
