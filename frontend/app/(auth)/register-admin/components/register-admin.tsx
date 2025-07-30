"use client";

import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useFormContext, useFormState } from "react-hook-form";
import FileUpload from "./file-upload";



import { RegisterAdminPayload } from "../types";


export const RegisterAdmin = () => {
  const { register } = useFormContext();

  const { isSubmitting, errors } =
    useFormState<RegisterAdminPayload>();

  return (
    <Box sx={{ width: '100%', padding: '5px'}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      }} component="main" maxWidth="xs">
        <Box sx={{
          width: '48%'
        }} >
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            {...register("username")}
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            error={!!errors.username?.message}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password")}
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            fullWidth
            label="Password"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
          <TextField
            {...register("email")}
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            fullWidth
            label="Email"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("fname")}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            fullWidth
            label="First Name"
            error={!!errors.fname?.message}
            helperText={errors.fname?.message}
          />
          <TextField
            {...register("lname")}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
            fullWidth
            label="Last Name"
            error={!!errors.lname?.message}
            helperText={errors.lname?.message}
          />
        </Box>

        <Box sx={{
          width: '48%'
        }} >
            <FileUpload />
        </Box>
      </Box>
      <Box sx={{
          width: '10%',
          display: 'flex'
        }} >
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </LoadingButton>
        </Box>
    </Box>
  );
};
