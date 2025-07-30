"use client";

import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ChangePasswordSchema } from "./change-password-schema";
import { ChangePasswordPayload } from "../types";




const DEFAULT_VALUES = {
  newPassword: "",
  oldPassword: "",
} as ChangePasswordPayload;

type FormProviderProps = {
  defaultValues?: ChangePasswordPayload;
  onSubmit?: (formData: ChangePasswordPayload) => Promise<void>;
};

export const ChangeUserFormProvider: FC<
  React.PropsWithChildren<FormProviderProps>
> = (props) => {
  const { children, defaultValues = DEFAULT_VALUES, onSubmit } = props;

  const methods = useForm<ChangePasswordPayload>({
    defaultValues,
    resolver: yupResolver(ChangePasswordSchema),
  });

  const handleSubmit = async (data: ChangePasswordPayload) => {
    await onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} role="form">
        {children}
      </form>
    </FormProvider>
  );
};
