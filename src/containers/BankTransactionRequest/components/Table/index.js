import React, { useMemo, useState, useCallback, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { tableIcons } from '../../../../../public/tableIcon';
import { Button, Divider, Grid } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const Table = (props) => {
  const { tableData, handleEdit, onDelete, getTableData, handleAdd } = props;

  const { pageIndex, pageSize, totalCount, data, loading, searchValues } =
    tableData;

  const columns = useMemo(() => [
    {
      field: 'rowId',
      title: 'STT',
      cellStyle: {
        width: '80px',
        minWidth: '80px'
      }
    },
    {
      field: 'id',
      title: 'Id',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'uuid',
      title: 'Id của request gửi lên Bank',
      cellStyle: {
        width: '220px',
        minWidth: '220px'
      }
    },
    {
      field: 'refNo',
      title: 'Mã giao dịch tham chiếu từ kss -> bank',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'service',
      title: 'Loại chuyển tiền',
      cellStyle: {
        width: '80px',
        minWidth: '80px'
      }
    },
    {
      field: 'transType',
      title: 'Loại giao dịch',
      cellStyle: {
        width: '80px',
        minWidth: '80px'
      }
    },
    {
      field: 'sourceNo',
      title: 'Tài khoản nguồn',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'targetNo',
      title: 'Tài khoản đích nhận',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'amount',
      title: 'Số tiền',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      },
      type: 'currency',
      currencySetting: {
        locale: 'vi',
        currencyCode: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      },
      align: 'right'
    },
    {
      field: 'remark',
      title: 'Nội dung chuyển khoản',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'bankId',
      title: 'Mã ngân hàng',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'bankCode',
      title: 'Mã nhân hàng thụ hưởng',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'bankName',
      title: 'Tên ngân hàng',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'benName',
      title: 'Tên chủ tài khoản',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'branchCode',
      title: 'Mã chi nhánh',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'branchName',
      title: 'Tên chi nhánh',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'branchChannel',
      title: 'Kênh chuyển tiền',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'actor',
      title: 'username thực hiện giao dịch',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'useragent',
      title: 'Địa chỉ IP / thông tin webclient thực hiện giao dịch',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'appCode',
      title: 'Định dang application nào gửi yêu cầu',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'approvedAt',
      title: 'thời gian được approve',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'marker',
      title: 'Thông tin của maker tạo giao dịch',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'checker',
      title: 'Thông tin checker duyệt giao dịch',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'approver',
      title: 'Người duyệt giao dịch',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'switchCode',
      title: 'Mã đơn vị ngân hàng KSS gửi lệnh sang',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'accountNo',
      title: 'Tài khoản',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'errorMessage',
      title: 'Thông báo',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'beneficiaryName',
      title: 'Beneficiary Name',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'channel',
      title: 'Kênh',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'createdAt',
      title: 'Ngày tạo',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    }
  ]);

  const actions = useMemo(() => [
    // {
    //   icon: tableIcons.Refresh,
    //   tooltip: 'Refresh Data',
    //   isFreeAction: true,
    //   onClick: () => getTableData()
    // },
    handleEdit && {
      icon: tableIcons.Preview,
      tooltip: 'View Account',
      onClick: (event, rowData) => handleEdit(rowData, 'view')
    }
    // handleEdit && {
    //   icon: tableIcons.Edit,
    //   tooltip: 'Save User',
    //   onClick: (event, rowData) => handleEdit(rowData)
    // },
    // (rowData) =>
    //   onDelete && {
    //     icon: tableIcons.Delete,
    //     tooltip: 'Delete User',
    //     onClick: (event, rowData) => onDelete(rowData)
    //   }
  ]);

  const options = {
    filtering: true,
    actionsColumnIndex: -1,
    draggable: false,
    paging: true,
    pageSize: 200,
    emptyRowsWhenPaging: false
    // doubleHorizontalScroll: true
  };

  const handlePageChange = useCallback((event, newPage) => {
    const params = { pageindex: pageIndex + 1, pagesize: pageSize };
    getTableData(params, searchValues);
  });

  const handleRowsPerPageChange = useCallback((event) => {
    const params = {
      pageindex: 1,
      pagesize: parseInt(event.target.value)
    };
    getTableData(params, searchValues);
  });

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title="Bảng giao dịch chi hộ"
        isLoading={loading}
        data={data}
        icons={tableIcons}
        columns={columns}
        actions={actions}
        options={options}
        components={{
          Pagination: (props) => (
            <TablePagination
              {...props}
              rowsPerPageOptions={[10, 25, 50, 100, 200]}
              component="td"
              count={totalCount ? totalCount : 0}
              page={pageIndex - 1}
              labelRowsPerPage="Số hàng trên trang"
              rowsPerPage={pageSize}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          ),
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: '5px' }} />
              <Divider variant="middle" />
              <div style={{ padding: '10px' }} />
              {handleAdd && (
                <div style={{ padding: '10px 10px' }}>
                  <Button
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Thêm danh giao dịch chi hộ
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
