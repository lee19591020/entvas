"use client";

import * as React from "react";
import { useFormContext, useFormState } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import { Alert, Stack } from "@mui/material";
import { FC } from "react";
import { ChangePasswordPayload, ChangePasswordState } from "../types";




interface ChangeProps {
  changedPassword?: ChangePasswordState | undefined;
}

export const ChangePassword: FC<ChangeProps> = ({ changedPassword }) => {
  const { register, reset } = useFormContext();
  const { isSubmitting, errors } = useFormState<ChangePasswordPayload>();

  React.useEffect(() => {
    reset();
  },[changedPassword, reset])

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            alignSelf: "self-start",
          }}
          component="h1"
          variant="h6"
        >
          Create New Password
        </Typography>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          {...register("newPassword")}
          margin="normal"
          type="password"
          required
          fullWidth
          label="New password"
          autoFocus
          error={!!errors.newPassword?.message}
          helperText={errors.newPassword?.message}
        />
        <TextField
          {...register("oldPassword")}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          required
          fullWidth
          label="Old password"
          type="password"
          autoComplete="current-password"
          error={!!errors.oldPassword?.message}
          helperText={errors.oldPassword?.message}
        />
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Change Password
        </LoadingButton>
      </Box>
      {changedPassword && (
        <Alert severity={changedPassword?.status ? "success" : "error"}>
          {changedPassword?.status ? (
            <>
              <Typography>{changedPassword?.message}</Typography>
            </>
          ) : (
            <Typography>{changedPassword?.message}</Typography>
          )}
        </Alert>
      )}
    </Stack>
  );
};
