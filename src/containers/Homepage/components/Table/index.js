import React, { useMemo } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../../../../components/TableIcon';
import { Button } from '@material-ui/core';

const Table = (props) => {
  const { tableData, handleEdit, onDelete, getTableData, handleAdd } = props;

  tableData.map((data) => {
    if (Number(data.synStatus) === 1) {
      data.synStatus = 'Hoạt Động';
    }
    if (Number(data.synStatus) === 2) {
      data.synStatus = 'Bị khoá';
    }
    if (Number(data.synStatus) === 3) {
      data.synStatus = 'Huỷ';
    }
  });

  const columns = useMemo(() => [
    {
      field: 'acctNo',
      title: 'Số tài khoản'
    },
    {
      field: 'balance',
      title: 'Tổng tài khoản'
    },
    {
      field: 'holdBalance',
      title: 'Tổng tiền hold'
    },
    {
      field: 'availableBalance',
      title: 'Tài khoản khả dụng'
    },
    {
      field: 'synStatus',
      title: 'Trạng thái'
    }
  ]);

  const actions = [
    {
      icon: tableIcons.Refresh,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => getTableData()
    },
    {
      icon: tableIcons.Edit,
      tooltip: 'Save User',
      onClick: (event, rowData) => handleEdit(rowData)
    },
    (rowData) => ({
      icon: tableIcons.Delete,
      tooltip: 'Delete User',
      onClick: (event, rowData) => onDelete(rowData)
    })
  ];

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title="Giao  dịch tổng hợp"
        data={tableData}
        icons={tableIcons}
        columns={columns}
        actions={actions}
        options={{
          filtering: true,
          actionsColumnIndex: -1,
          draggable: false
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: '0px 10px' }}>
                <Button onClick={handleAdd} variant="contained" color="primary">
                  Add user
                </Button>
              </div>
            </div>
          )
        }}
      />
    </div>
  );
};

export default Table;
