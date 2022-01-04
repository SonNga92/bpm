import React, { useMemo, useState, useCallback, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { tableIcons } from '../../../../../public/tableIcon';
import { Button, Divider, Grid } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const Table = (props) => {
  const { tableData, handleEdit, onDelete, getTableData, handleAdd } = props;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { pageIndex, pageSize, totalCount, data, loading, searchValues } =
    tableData;

  useEffect(() => {}, [tableData]);

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
      field: 'bank_id',
      title: 'Mã bank',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'bankName',
      title: 'Tên ngân hàng',
      cellStyle: {
        width: '220px',
        minWidth: '220px'
      }
    },
    {
      field: 'shortName',
      title: 'Mã ngân hàng',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'citadBankId',
      title: 'citadBankId',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      },
      align: 'right'
    },
    {
      field: 'cityName',
      title: 'Thành phố',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'bankFullname',
      title: 'bankFullname',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    },
    {
      field: 'bankShortname',
      title: 'bankShortname',
      cellStyle: {
        width: '150px',
        minWidth: '150px'
      }
    }
  ]);

  const actions = useMemo(() => [
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
      tooltip: 'Save User',
      onClick: (event, rowData) => handleEdit(rowData)
    },
    (rowData) =>
      onDelete && {
        icon: tableIcons.Delete,
        tooltip: 'Delete User',
        onClick: (event, rowData) => onDelete(rowData)
      }
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
    setRowsPerPage(parseInt(event.target.value));
    const params = {
      pageindex: 1,
      pagesize: parseInt(event.target.value)
    };
    getTableData(params, searchValues);
  });

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title="Danh mục ngân hàng"
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
                    Thêm danh mục ngân hàng
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
