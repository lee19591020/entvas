"use client"

import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateAdminPayload } from '../../update/types'
import { updateAdminSchema } from './update-admin-schema'
import { getAdminById } from '@/api/api'
import { Backdrop, CircularProgress } from '@mui/material'



const DEFAULT_VALUES = {
    email: "",
    fname: "",
    lname: "",
    imageData: "",
    ext: ""
} as UpdateAdminPayload

type UpdateAdminProps = {
  defaultValues?: UpdateAdminPayload
  onSubmit?: (formData: UpdateAdminPayload) => Promise<void>
}

export const UpdateAdminProvider: FC<
  React.PropsWithChildren<UpdateAdminProps>
> = (props) => {
  const { children, defaultValues = DEFAULT_VALUES, onSubmit } = props

  const methods = useForm<UpdateAdminPayload>({
    defaultValues,
    resolver: yupResolver(updateAdminSchema)
  })

  const handleSubmit = async (data: UpdateAdminPayload) => {
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