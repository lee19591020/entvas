"use client";


import { Backdrop, Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { AdminInfo } from "../types";
import { getAdminById } from "@/api/api";

interface iProps {
    adminId: string;
}

export const ViewInfo:FC<iProps> = ({ adminId }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [admin, setInfo] = useState<AdminInfo | null>();
    
    useEffect(() => {
      if(adminId){
        const getAdminInformation = async () => {
          const dataResponse = await getAdminById(adminId);
          setLoading(false);
          if(dataResponse){
            setInfo(dataResponse.admin);
          }
        };
        setLoading(true);
        getAdminInformation();
      }
    }, [adminId, setInfo]);
    const router = useRouter();

    return (
        <Box sx={{ width: '100%' }}>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!loading && admin && (
                <>
                    <Box sx={{ width: '100%', marginBottom: '20px'}}>
                        <Typography sx={{
                            fontWeight: 700,
                        }}>
                            Admin Name: ({admin?.fname})
                        </Typography>
                    </Box>
                    <Grid sx={{ border: '1px solid grey', borderRadius: '5px', padding: '5px', marginBottom: '20px'}} container>
                        <Grid component="div" sx={{ width: '100%' }}>
                            <Box>
                                <Typography sx={{
                                    fontWeight: 400,
                                }}>
                                    Name: {admin?.fname}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{
                                    fontWeight: 400,
                                }}>
                                    Last Name: {admin?.lname}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid component="div">
                            <Box sx={{ display: 'flex', border: '1px solid #000',borderRadius: '5px', padding: '5px', height: 260, width: 200, alignSelf: 'center'}}>
                                <Image
                                    src={admin?.imageData ?? '/no_image_available.jpg'}
                                    loading="lazy"
                                    alt="Picture"
                                    height={260}
                                    width={200}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}
            <Stack spacing={2} sx={{ mt: "12px", width: "100%" }}>
                <Button sx={{
                    width: '100px'
                    }} variant="contained" onClick={() => {
                        router.replace('/admin-list');
                    }}>
                    Back
                </Button>
            </Stack>
        </Box>
    );
}