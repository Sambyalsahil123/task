import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      firstName: "",
      password: "",
      email: "",
      isAdmin: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data, "this is data");
    const userData = { firstName: data.firstName, isAdmin: data.isAdmin };
    localStorage.setItem("user_login", JSON.stringify(userData));
    reset();

    if (props.onLogin) {
      props.onLogin();
    }

    navigate("/dashboard");
  };

  const handleLoginClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper style={{ padding: 20, maxWidth: 400 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h5" align="center" gutterBottom>
            Login Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    error={!!formState.errors.firstName}
                    helperText={formState.errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    error={!!formState.errors.password}
                    helperText={formState.errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    error={!!formState.errors.email}
                    helperText={formState.errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="isAdmin"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} color="primary" />
                    )}
                  />
                }
                label="Is Admin"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleLoginClick}
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Login
          </Button>
        </form>
      </Paper>
      <DevTool control={control} />
    </Grid>
  );
};

export default LoginForm;
