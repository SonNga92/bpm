import React, { useMemo, useCallback } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { tableIcons } from '../../../../../public/tableIcon';
import { Button, Divider } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const Table = (props) => {
  const { tableData, handleEdit, onDelete, getTableData, handleAdd } = props;

  const { pageIndex, pageSize, totalCount, data, loading, searchValues } =
    tableData;

  console.log(data);

  data.map((data) => {
    if (Number(data.synStatus) === 1) {
      data.synStatus = {
        value: 1,
        label: 'Hoạt động'
      };
    }
    if (Number(data.synStatus) === 2) {
      data.synStatus = {
        value: 2,
        label: 'Bị khoá'
      };
    }
    if (Number(data.synStatus) === 0) {
      data.synStatus = {
        value: 3,
        label: 'Huỷ'
      };
    }
  });

  const columns = useMemo(() => [
    {
      field: 'id',
      title: 'Id',
      cellStyle: {
        width: '100px',
        minWidth: '100px'
      }
    },
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
      field: 'holdBalance',
      title: 'Tổng tiền hold',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
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
      field: 'availableBalance',
      title: 'Tài khoản khả dụng',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
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
      field: 'synStatus.label',
      title: 'Trạng thái',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
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
    // ,
    // handleEdit && {
    //   icon: tableIcons.Edit,
    //   tooltip: 'Edit Account',
    //   onClick: (event, rowData) => handleEdit(rowData)
    // },
    // (rowData) =>
    //   onDelete && {
    //     icon: tableIcons.Delete,
    //     tooltip: 'Delete Account',
    //     onClick: (event, rowData) => onDelete(rowData)
    //   }
  ];

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
        title="Bảng dữ liệu tài khoản của khách hàng"
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
