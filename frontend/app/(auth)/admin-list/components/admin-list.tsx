import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TableWrapper from "../../components/data-grid-view";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminColumn } from "../types";
import { getAdminLists } from "@/api/api";
import Image from "next/image";
import { ExcelData, exportToExcel } from "@/lib/exportToExcel";


export const AdminList = () => {
  const router = useRouter();

  const columns: GridColDef<AdminColumn>[] = [
    {
      field: "username",
      headerName: "Username",
      headerAlign: "center",
      type: "string",
      sortable: false,
      align: "center",
      flex: 1,
    },
    {
      field: "fname",
      headerName: "Name",
      headerAlign: "center",
      type: "string",
      sortable: false,
      align: "center",
      flex: 1,
    },
    {
      field: "lname",
      headerName: "Last Name",
      headerAlign: "center",
      type: "string",
      sortable: false,
      align: "center",
      flex: 1,
    },
    {
      field: "imageData",
      headerName: "Picture",
      headerAlign: "left",
      flex: 1,
      sortable: false,
      type: "string",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', border: '1px solid #000', padding: '5px', height: 30, width: 30, alignSelf: 'center', justifyContent: 'center'}}>
            <Image
              src={row.imageData ?? '/no_image_available.jpg'}
              loading="lazy"
              alt="Profile picture"
              height={30}
              width={30}
            />
          </Box>
        );
      },
    },
    {
      field: "_id",
      headerName: "Action",
      headerAlign: "center",
      width: 150,
      type: "string",
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: ({ row }) => {
        return (
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              mt: '5px'
            }}>
              <Button sx={{
              }} variant="outlined" onClick={ async () => {
                  router.replace(`/detail/${row._id}/${row.canUpdate ? 'update': 'view'}`);
                }}>
                  { row.canUpdate ? 'Update': 'View' }
              </Button>
            </Box>
        );
      },
    },
  ];

 
  const [requestTimeSec, setRequestTimeSec] = useState<number | null>(null);
  const [admin, setAdmin] = useState<AdminColumn[]>();
  const [loading, setLoading] = useState<boolean>(true);

    const getDataLists = useCallback(async () => {
      return await getAdminLists();
    }, []);
  
    useEffect(() => {
      const start = performance.now();
      const get = async () => {
        const dataLists = await getDataLists();
        const end = performance.now();
        const durationInSeconds = Math.round((end - start) / 1000);
    setRequestTimeSec(durationInSeconds);
        setLoading(false);
        if(dataLists?.status){
          setAdmin(dataLists.admins);
        }
        
      };
      get();
    },[getDataLists]);
  const handleRegisterUser = () => {
    router.replace('/register-admin');
  }

  const handleExport = () => {
    if(admin && admin?.length > 0){
      const excelData: ExcelData[] = admin.map((data) => {
        return {
          fname: data.fname,
          lname: data.lname,
          username: data.username
        } as ExcelData
      })
      exportToExcel(excelData, 'admin-list');
    }
  };
  return (
    <Box sx={{ flex: 1, width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            mt: "12px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start", 
            alignItems: "center"
          }}
        >
          <Button variant="outlined" disabled={loading} onClick={handleExport} sx={{ width: '150px', height: '40px', alignSelf: 'center', padding: '4px', marginRight: '20px' }}>
            Export to Excel
          </Button>
          <Button variant="contained" disabled={loading} onClick={handleRegisterUser} sx={{ width: '150px', height: '40px', alignSelf: 'center', padding: '4px' }}>
            Add new Admin
          </Button>
        </Box>
        <Box sx={{ mt: "12px", width: "100%" }}>
          <TableWrapper>
            {(config) => (
              <DataGrid
                {...config}
                rows={admin ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                loading={loading}
                getRowHeight={() => 50}
              />
            )}
          </TableWrapper>
        </Box>
      </Box>
      {requestTimeSec !== null && (
        <Box sx={{ mt: 2, textAlign: 'right', fontStyle: 'italic', color: 'gray' }}>
          Request completed in {requestTimeSec} second{requestTimeSec !== 1 ? 's' : ''}.
        </Box>
      )}
    </Box>
  );
};
