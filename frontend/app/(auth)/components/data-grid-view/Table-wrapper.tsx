import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { DataGridProps } from "@mui/x-data-grid";

const payload: Partial<DataGridProps> = {
  autoHeight: true,
  disableColumnMenu: true,
  disableRowSelectionOnClick: true,
  localeText: {
    noRowsLabel: "No data",
  },
};

type TableWrapperProps = {
  children: (data: typeof payload) => ReactNode;
};

const TableWrapper: FC<TableWrapperProps> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: "rgb(224 224 224)",
          borderRadius: "8px",
          border: "none !important",
        },
        "& .MuiDataGrid-columnHeader": {
          "&:focus": {
            outline: "none !important",
          },
        },
        "& .MuiDataGrid-root": {
          border: "1px solid rgb(224 224 224) !important",
        },
        "& .MuiDataGrid-cell": {
          border: "none !important",
          outline: "none !important",
          wordWrap: "break-word !important",
          whiteSpace: "normal !important",
        },
        "& .MuiDataGrid-virtualScrollerContent": {
          border: "none !important",
        },
        "& .MuiDataGrid-row": {
          borderBottom: "1px solid",
          borderColor: "rgb(224 224 224)",
          position: "relative",
          "&:hover": {
            bgcolor: "rgba(145, 158, 171, 0.06)",
          },
        },
        "& .MuiDataGrid-main > div": {
          minHeight: "400px",
        },
      }}
    >
      {children(payload)}
    </Box>
  );
};

export default TableWrapper;
