'use client'

import { FC, Fragment, ReactNode, useEffect, useState } from "react"
import { UpdateAdminPayload } from "../../update/types"
import { getAdminById } from "@/api/api"
import { useParams } from "next/navigation"
import { Box, CircularProgress } from "@mui/material"




type getAdminProps = {
  children: (data?: UpdateAdminPayload) => ReactNode
}

export const GetAdminData: FC<getAdminProps> = (props) => {
    const params = useParams();
    const adminId = params?.adminId as string;
    const { children } = props


    const [admin, setAdmin] = useState<UpdateAdminPayload>();

    useEffect(() => {
      if(adminId){
        const getAdminInformation = async () => {
          const dataResponse = await getAdminById(adminId);

          if(dataResponse){
            const { email, fname, lname, ext, imageData } = dataResponse?.admin
            setAdmin({
              email,
              fname,
              lname,
              ext,
              imageData
            });
          }
        };

        getAdminInformation();
      }
    }, [adminId, setAdmin]);

    if (admin) {
        return <Fragment>{children(admin)}</Fragment>
    }
    return (
        <Box
        sx={{
            width: '100%',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <CircularProgress color="inherit" />
        </Box>
    )
}