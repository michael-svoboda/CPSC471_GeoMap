import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
//import { useTheme } from "@mui/material";

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5},
        {field: "registrarId", headerName: "Resgistrar ID"},
        {
            field: "name", 
            headerName: 'Name', 
            flex: 1, 
            cellClassName: "name-column--cell"
        },
        {
            field: "age", 
            headerName: 'Age', 
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone", 
            headerName: 'Phone Number',
            flex: 1, 
        },
        {
            field: "email", 
            headerName: 'Email',
            flex: 1, 
        },
        {
            field: "cost", 
            headerName: 'Cost',
            flex: 1, 
            renderCell: (params) => (
                <Typography color = {colors.greenAccent}>
                    ${params.row.cost}
                </Typography>
            )
        },
        {
            field: "date", 
            headerName: 'Date',
            flex: 1, 
        },


    ];

    return (
        <Box m = "20px">
            <Header title = "Invoices" subtitle = " List of Invoices " />
            <Box m="40px 0 0 0" height= "75vh" sx={{
                "& .MuiDataGrid-root" : {
                    border: "none",
                },
                "& .MuiDataGrid-cell" : {
                    borderHottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.blueAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.grey[800],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.grey[700],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.grey[800],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.blueAccent[200]} !important`
                }
            }}
            
            >
                <DataGrid
                    checkboxSelection
                    rows={mockDataInvoices}
                    columns={columns}
                    components = {{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Invoices;