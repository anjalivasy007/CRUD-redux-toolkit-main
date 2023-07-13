
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { addUser } from "./userSlice";
// import { TextField, Button, Container, Grid, Typography } from "@mui/material";

// const AddUser = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [values, setValues] = useState({
//     firstName: "",
//     lastName: "",
//     birthDate: "",
//     gender: "",
//     age: "",
//     email: "",
//     phone: "",
//     maritalStatus: "single",
//     spouseName: "",
//     spouseEmail: "",
//     spousePhone: "",
//     languages: {
//       java: false,
//       react: false,
//       fullStack: false,
//     },
//   });

//   const [errors, setErrors] = useState({});

//   const handleAddUser = () => {
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       const user = {
//         id: uuidv4(),
//         firstName: values.firstName,
//         lastName: values.lastName,
//         birthDate: values.birthDate,
//         gender: values.gender,
//         age: values.age,
//         email: values.email,
//         phone: values.phone,
//         maritalStatus: values.maritalStatus,
//         spouseName: values.spouseName,
//         spouseEmail: values.spouseEmail,
//         spousePhone: values.spousePhone,
//         languages: Object.keys(values.languages).filter(
//           (language) => values.languages[language]
//         ),
//       };

//       const storedData = localStorage.getItem("users");
//       const users = storedData ? JSON.parse(storedData) : [];
//       users.push(user);
//       localStorage.setItem("users", JSON.stringify(users));

//       setValues({
//         firstName: "",
//         lastName: "",
//         birthDate: "",
//         gender: "",
//         age: "",
//         email: "",
//         phone: "",
//         maritalStatus: "single",
//         spouseName: "",
//         spouseEmail: "",
//         spousePhone: "",
//         languages: {
//           java: false,
//           react: false,
//           fullStack: false,
//         },
//       });

//       dispatch(addUser(user));
//       navigate("/");
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};

    
//     if (!values.firstName.trim()) {
//       errors.firstName = "First Name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(values.firstName)) {
//       errors.firstName = "any special characters";
//     }
//     if (!values.lastName.trim()) {
//       errors.lastName = "First Name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(values.lastName)) {
//       errors.lastName = "any special characters";
//     }
//     if (!values.birthDate) {
//       errors.birthDate = "Birth Date is required";
//     } else {
//       const today = new Date();
//       const selectedDate = new Date(values.birthDate);
//       if (selectedDate > today) {
//         errors.birthDate = "Birth Date cannot be a future date";
//       }
//     }
//     if (!values.gender) {
//       errors.gender = "Gender is required";
//     }
//     if (!values.age) {
//       errors.age = "Age is required";
//     } 
    
//     if (!values.email.trim()) {
//       errors.email = "Email is required";
//     }
//     if (!values.phone.trim()) {
//       errors.phone = "Phone Number is required";
//     }
//     if (values.email.trim() && !isValidEmail(values.email)) {
//       errors.email = "Invalid email format";
//     }

//     if (values.phone.trim() && !isValidPhoneNumber(values.phone)) {
//       errors.phone = "Invalid phone number format";
//     }
//     if (!values.spouseName.trim()) {
//       errors.spouseName = "First Name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(values.spouseName)) {
//       errors.spouseName = "No Any special chara";
//     }
//     if (!values.spouseEmail.trim()) {
//       errors.spouseEmail = " Email is required";
//     }
//     if (!values.spousePhone.trim()) {
//       errors.spousePhone = " phone is required";
//     }
//     if (values.spouseEmail.trim() && !isValidEmail(values.spouseEmail)) {
//       errors.spouseEmail = "Invalid email format";
//     }
//     if (values.spousePhone.trim() && !isValidPhoneNumber(values.spousePhone)) {
//       errors.spousePhone = "Invalid phone number format";
//     }
//     return errors;
//   };

//   const isValidEmail = (email) => {
//     // Email regex validation pattern
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const isValidPhoneNumber = (phone) => {
//     // Phone number regex validation pattern
//     const phonePattern = /^\d{10}$/;
//     return phonePattern.test(phone);
//   };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       languages: {
//         ...prevValues.languages,
//         [name]: checked,
//       },
//     }));
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h5" align="center" gutterBottom>
//         Add User
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             id="firstName"
//             label="First Name"
//             value={values.firstName}
//             onChange={(e) =>
//               setValues({ ...values, firstName: e.target.value })
//             }
//             error={Boolean(errors.firstName)}
//             helperText={errors.firstName}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="lastName"
//             label="Last Name"
//             value={values.lastName}
//             onChange={(e) => setValues({ ...values, lastName: e.target.value })}
//             error={Boolean(errors.lastName)}
//             helperText={errors.lastName}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="birthDate"
//             label="Birth Date"
//             type="date"
//             value={values.birthDate}
//             onChange={(e) => setValues({ ...values, birthDate: e.target.value })}
//             error={Boolean(errors.birthDate)}
//             helperText={errors.birthDate}
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="gender"
            
//             select
//             value={values.gender}
//             onChange={(e) => setValues({ ...values, gender: e.target.value })}
//             error={Boolean(errors.gender)}
//             helperText={errors.gender}
//             fullWidth
//             SelectProps={{
//               native: true,
//             }}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </TextField>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="age"
//             label="Age"
//             type="number"
//             value={values.age}
//             onChange={(e) => setValues({ ...values, age: e.target.value })}
//             error={Boolean(errors.age)}
//             helperText={errors.age}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="email"
//             label="Email"
//             type="email"
//             value={values.email}
//             onChange={(e) => setValues({ ...values, email: e.target.value })}
//             error={Boolean(errors.email)}
//             helperText={errors.email}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="phone"
//             label="Phone Number"
//             type="tel"
//             value={values.phone}
//             onChange={(e) => setValues({ ...values, phone: e.target.value })}
//             error={Boolean(errors.phone)}
//             helperText={errors.phone}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="maritalStatus"
//             label="Marital Status"
//             select
//             value={values.maritalStatus}
//             onChange={(e) =>
//               setValues({ ...values, maritalStatus: e.target.value })
//             }
//             fullWidth
//             SelectProps={{
//               native: true,
//             }}
//           >
//             <option value="single">Single</option>
//             <option value="married">Married</option>
//           </TextField>
//         </Grid>
//         {values.maritalStatus === "married" && (
//           <>
//             <Grid item xs={12}>
//               <TextField
//                 id="spouseName"
//                 label="Spouse Name"
//                 value={values.spouseName}
//                 onChange={(e) =>
//                   setValues({ ...values, spouseName: e.target.value })
//                 }
//                 fullWidth
//                 error={Boolean(errors.spouseName)}
//                 helperText={errors.spouseName}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="spouseEmail"
//                 label="Spouse Email"
//                 type="email"
//                 value={values.spouseEmail}
//                 onChange={(e) =>
//                   setValues({ ...values, spouseEmail: e.target.value })
//                 }
//                 fullWidth
//                 error={Boolean(errors.spouseEmail)}
//                 helperText={errors.spouseEmail}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="spousePhone"
//                 label="Spouse Phone Number"
//                 type="tel"
//                 value={values.spousePhone}
//                 onChange={(e) =>
//                   setValues({ ...values, spousePhone: e.target.value })
//                 }
//                 fullWidth
//                 error={Boolean(errors.spousePhone)}
//                 helperText={errors.spousePhone}
//               />
//             </Grid>
//           </>
//         )}
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             onClick={handleAddUser}
//             color="primary"
//             fullWidth
//           >
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default AddUser;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addUser } from "./userSlice";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    maritalStatus: "single",
    spouseName: "",
    spouseEmail: "",
    spousePhone: "",
    languages: {
      java: false,
      react: false,
      fullStack: false,
    },
  });

  const [errors, setErrors] = useState({});

  const handleAddUser = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const user = {
        id: uuidv4(),
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        gender: values.gender,
        age: values.age,
        email: values.email,
        phone: values.phone,
        maritalStatus: values.maritalStatus,
        spouseName: values.spouseName,
        spouseEmail: values.spouseEmail,
        spousePhone: values.spousePhone,
        languages: Object.keys(values.languages).filter(
          (language) => values.languages[language]
        ),
      };

      const storedData = localStorage.getItem("users");
      const users = storedData ? JSON.parse(storedData) : [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      setValues({
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        age: "",
        email: "",
        phone: "",
        maritalStatus: "single",
        spouseName: "",
        spouseEmail: "",
        spousePhone: "",
        languages: {
          java: false,
          react: false,
          fullStack: false,
        },
      });

      dispatch(addUser(user));
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!values.firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.firstName)) {
      errors.firstName = "First Name should not contain any special characters";
    }
    if (!values.lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.lastName)) {
      errors.lastName = "Last Name should not contain any special characters";
    }
    if (!values.birthDate) {
      errors.birthDate = "Birth Date is required";
    } else {
      const today = new Date();
      const selectedDate = new Date(values.birthDate);
      if (selectedDate > today) {
        errors.birthDate = "Birth Date cannot be a future date";
      }
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.age) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(values.age)) {
      errors.age = "Age should be a number";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!isValidPhoneNumber(values.phone)) {
      errors.phone = "Invalid phone number format";
    }
    if (values.maritalStatus === "married") {
      if (!values.spouseName.trim()) {
        errors.spouseName = "Spouse Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(values.spouseName)) {
        errors.spouseName = "Spouse Name should not contain any special characters";
      }
      if (!values.spouseEmail.trim()) {
        errors.spouseEmail = "Spouse Email is required";
      } else if (!isValidEmail(values.spouseEmail)) {
        errors.spouseEmail = "Invalid email format";
      }
      if (!values.spousePhone.trim()) {
        errors.spousePhone = "Spouse Phone Number is required";
      } else if (!isValidPhoneNumber(values.spousePhone)) {
        errors.spousePhone = "Invalid phone number format";
      }
      if (!values.age) {
        errors.age = "Age is required";
      } else if (!/^\d+$/.test(values.age)) {
        errors.age = "Age should be a number";
      } else if (values.age < 0 || values.age > 100) {
        errors.age = "Age should be between 0 and 100";
      }
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Email regex validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phone) => {
 
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      languages: {
        ...prevValues.languages,
        [name]: checked,
      },
    }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Add User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="firstName"
            label="First Name"
            value={values.firstName}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="birthDate"
            label="Birth Date"
            type="date"
            value={values.birthDate}
            onChange={(e) => setValues({ ...values, birthDate: e.target.value })}
            error={Boolean(errors.birthDate)}
            helperText={errors.birthDate}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="gender"
            select
            value={values.gender}
            onChange={(e) => setValues({ ...values, gender: e.target.value })}
            error={Boolean(errors.gender)}
            helperText={errors.gender}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="age"
            label="Age"
            type="number"
            value={values.age}
            onChange={(e) => setValues({ ...values, age: e.target.value })}
            error={Boolean(errors.age)}
            helperText={errors.age}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            label="Phone Number"
            type="tel"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="maritalStatus"
            label="Marital Status"
            select
            value={values.maritalStatus}
            onChange={(e) =>
              setValues({ ...values, maritalStatus: e.target.value })
            }
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </TextField>
        </Grid>
        {values.maritalStatus === "married" && (
          <>
            <Grid item xs={12}>
              <TextField
                id="spouseName"
                label="Spouse Name"
                value={values.spouseName}
                onChange={(e) =>
                  setValues({ ...values, spouseName: e.target.value })
                }
                fullWidth
                error={Boolean(errors.spouseName)}
                helperText={errors.spouseName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="spouseEmail"
                label="Spouse Email"
                type="email"
                value={values.spouseEmail}
                onChange={(e) =>
                  setValues({ ...values, spouseEmail: e.target.value })
                }
                fullWidth
                error={Boolean(errors.spouseEmail)}
                helperText={errors.spouseEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="spousePhone"
                label="Spouse Phone Number"
                type="tel"
                value={values.spousePhone}
                onChange={(e) =>
                  setValues({ ...values, spousePhone: e.target.value })
                }
                fullWidth
                error={Boolean(errors.spousePhone)}
                helperText={errors.spousePhone}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleAddUser}
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddUser;
