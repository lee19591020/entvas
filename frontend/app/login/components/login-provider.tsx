"use client"

import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginPayload } from '../types'
import { LoginPayloadSchema } from './login-schema'


const DEFAULT_VALUES = {
    username: '',
    password: ''
} as LoginPayload

type LoginFormProviderProps = {
  defaultValues?: LoginPayload
  onSubmit?: (formData: LoginPayload) => Promise<void>
}

export const LoginFormProvider: FC<
  React.PropsWithChildren<LoginFormProviderProps>
> = (props) => {
  const { children, defaultValues = DEFAULT_VALUES, onSubmit } = props

  const methods = useForm<LoginPayload>({
    defaultValues,
    resolver: yupResolver(LoginPayloadSchema),
  })

  const handleSubmit = async (data: LoginPayload) => {
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