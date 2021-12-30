import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { GlobalWrapper } from '../../styles/styles';
import useTableAccount from '../Account/components/hooks/useTable';
import TableAccount from '../Account/components/Table';
import useTableBank from '../BankInfo/components/hooks/useTable';
import TableBank from '../BankInfo/components/Table';

const Dashboard = () => {
  useEffect(() => {
    // useTableBank.getTableData;
    // useTableAccount.getTableData;
  }, []);

  return (
    <GlobalWrapper>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TableBank
            tableData={useTableBank().tableData}
            // handleEdit={handleEdit}
            // onDelete={onDelete}
            getTableData={useTableBank().getTableData}
            // handleAdd={handleAdd}
          />
        </Grid>
        <Grid item xs={6}>
          <TableAccount
            tableData={useTableAccount().tableData}
            // handleEdit={handleEdit}
            // onDelete={onDelete}
            getTableData={useTableAccount().getTableData}
            // handleAdd={handleAdd}
          />
        </Grid>
      </Grid>
    </GlobalWrapper>
  );
};

export default Dashboard;
