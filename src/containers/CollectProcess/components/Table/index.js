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
      field: 'serviceCode',
      title: 'Nạp tiền cho dịch vụ',
      cellStyle: {
        width: '80px',
        minWidth: '80px'
      }
    },
    {
      field: 'kssAccountNo',
      title: 'Tài khoản trên KSS',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'amount',
      title: 'Số tiền',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
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
      field: 'notifyId',
      title: 'ID notification',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      },
      align: 'right'
    },
    {
      field: 'ftId',
      title: 'Số FT',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      },
      align: 'right'
    },
    {
      field: 'analysisResult',
      title: 'Trạng thái phân tích',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'processResult',
      title: 'Trạng thái xử lý',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'processDate',
      title: 'Thời gian xử lý xong',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'flexResponse',
      title: 'Phản hồi của flex',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'flexResponseDetail',
      title: 'Chi tiết flex',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'targetSystem',
      title: 'Hệ thống',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'retryCount',
      title: 'Retry Count',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      },
      align: 'right'
    },
    {
      field: 'bankTransDate',
      title: 'Bank Trans Date',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'bookingDate',
      title: 'Booking Date',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'switchCode',
      title: 'Switch Code',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
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
        title="Bảng kết quả xử lý bản tin từ bank. Cộng tiền flex."
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
                    Thêm kết quả giao dịch chi hộ
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
