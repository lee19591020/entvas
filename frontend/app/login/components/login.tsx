"use client";

import * as React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { LoginPayload, LoginState } from "../types";
import { Alert, Container } from "@mui/material";
import { FC } from "react";

import { LoadingButton } from "@mui/lab";

interface LoginProps {
  loginStatus?: LoginState;
}

export const Login: FC<LoginProps> = ({ loginStatus }) => {
  const { register } = useFormContext();
  const { isSubmitting, errors } =
    useFormState<LoginPayload>();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          {...register("username")}
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          error={!!errors.username?.message}
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password")}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          name="login"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
      </Box>
      {loginStatus && loginStatus?.status !== 200 && (
        <Alert role="Error" severity="error">
          Username or password invalid!
        </Alert>
      )}
    </Container>
  );
};
