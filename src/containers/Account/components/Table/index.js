import React, { useMemo, useState } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { tableIcons } from '../../../../../public/tableIcon';
import { Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const Table = (props) => {
  const { tableData, handleEdit, onDelete, getTableData, handleAdd } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { pageIndex, pageSize, totalCount, data } = tableData;

  console.log('data', data);
  // data.map((data) => {
  //   if (Number(data.synStatus) === 1) {
  //     data.synStatus = {
  //       value: 1,
  //       label: 'Hoạt động'
  //     };
  //   }
  //   if (Number(data.synStatus) === 2) {
  //     data.synStatus = {
  //       value: 2,
  //       label: 'Bị khoá'
  //     };
  //   }
  //   if (Number(data.synStatus) === 0) {
  //     data.synStatus = {
  //       value: 3,
  //       label: 'Huỷ'
  //     };
  //   }
  // });

  const columns = useMemo(() => [
    {
      field: 'fullname',
      title: 'Tên khách hàng',
      cellStyle: {
        width: '200px',
        minWidth: '200px'
      }
    },
    {
      field: 'acctNo',
      title: 'Số tài khoản',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'balance',
      title: 'Tổng tài khoản',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'holdBalance',
      title: 'Tổng tiền hold',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'availableBalance',
      title: 'Tài khoản khả dụng',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'synStatus.label',
      title: 'Trạng thái',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'acctNo',
      title: 'acctNo',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'idcode',
      title: 'idcode',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'custid',
      title: 'custid',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    }
  ]);

  const actions = [
    {
      icon: tableIcons.Refresh,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => getTableData()
    },
    handleEdit && {
      icon: tableIcons.Preview,
      tooltip: 'View Account',
      onClick: (event, rowData) => handleEdit(rowData, 'view')
    },
    handleEdit && {
      icon: tableIcons.Edit,
      tooltip: 'Edit Account',
      onClick: (event, rowData) => handleEdit(rowData)
    },
    (rowData) =>
      onDelete && {
        icon: tableIcons.Delete,
        tooltip: 'Delete Account',
        onClick: (event, rowData) => onDelete(rowData)
      }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title="Bảng dữ liệu tài khoản của khách hàng"
        data={data}
        icons={tableIcons}
        columns={columns}
        actions={actions}
        options={{
          filtering: true,
          actionsColumnIndex: -1,
          draggable: false,
          pageSize: 10,
          paging: true,
          emptyRowsWhenPaging: false,
          doubleHorizontalScroll: true
        }}
        components={{
          Pagination: (props) => (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={100}
              page={page}
              labelRowsPerPage="Số hàng trên trang"
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ),
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              {handleAdd && (
                <div style={{ padding: '10px 10px' }}>
                  <Button
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Thêm tài khoản
                  </Button>
                </div>
              )}
            </div>
          )
        }}
      />
    </div>
  );
};

export default Table;
