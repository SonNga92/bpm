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
        width: '80px',
        minWidth: '80px'
      }
    },
    {
      field: 'refNo',
      title: 'refNo',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'ftId',
      title: 'ftId',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'uuid',
      title: 'uuid request',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'transferResult',
      title: 'Kết quả giao dịch',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'requestDate',
      title: 'Thời gian gửi bản tin đi',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      },
      align: 'right'
    },
    {
      field: 'responseDate',
      title: 'Thời gian client nhận được response',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'bankRequestDate',
      title: 'Thời gian nhận từ hệ thống middleware của bank',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'bankTranferDate',
      title: 'Thời gian giao dịch từ core banking',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'finalResult',
      title: 'Trạng thái cuối cùng',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
    {
      field: 'lastResult',
      title: 'Last Result',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'actionNo',
      title: 'actionNo',
      cellStyle: {
        width: '120px',
        minWidth: '120px'
      }
    },
    {
      field: 'txdate',
      title: 'tx date',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'txnum',
      title: 'tx num',
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
        title="Kết quả giao dịch chi hộ"
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
