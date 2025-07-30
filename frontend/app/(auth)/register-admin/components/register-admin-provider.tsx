"use client"

import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerAdminSchema } from './register-admin-schema'
import { RegisterAdminPayload } from '../types'



const DEFAULT_VALUES = {
    username: "",
    password: "",
    email: "",
    fname: "",
    lname: "",
    imageData: "",
    ext: ""
} as RegisterAdminPayload

type RegisterUserProviderProps = {
  defaultValues?: RegisterAdminPayload
  onSubmit?: (formData: RegisterAdminPayload) => Promise<void>
}

export const RegisterUserProvider: FC<
  React.PropsWithChildren<RegisterUserProviderProps>
> = (props) => {
  const { children, defaultValues = DEFAULT_VALUES, onSubmit } = props

  const methods = useForm<RegisterAdminPayload>({
    defaultValues,
    resolver: yupResolver(registerAdminSchema)
  })

  const handleSubmit = async (data: RegisterAdminPayload) => {
    await onSubmit?.(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} role="form">
        {children}
      </form>
    </FormProvider>
  )
}