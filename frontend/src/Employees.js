import { Box } from "@mui/material";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";

const employees = [
    {
        id: 1,
        name: 'Siyumi',
    },
    {
        id: 2,
        name: 'Piyumi',
    }
];

const Employees = () => {
    return(
        <Box 
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px',
            }}
        
        >
            <EmployeeForm />
            <EmployeeTable rows={employees} />
        </Box>
        
    );
}

export default Employees;