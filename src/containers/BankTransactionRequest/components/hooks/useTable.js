import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import bankTransactionRequestApi from '../../../../api/bankTransactionRequestApi';

const useTable = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    loading: false,
    data: [],
    searchValues: null
  });

  const updateTableData = useCallback(
    (curr) =>
      setTableData((prev) => {
        return { ...prev, ...curr };
      }),
    []
  );

  const getTableData = useCallback(async (params, searchValues) => {
    try {
      updateTableData({
        loading: true,
        data: []
      });
      let response = {};
      searchValues
        ? (response = await bankTransactionRequestApi.search({
            ...params,
            ...searchValues
          }))
        : (response = await bankTransactionRequestApi.getAll(params));
      const { data } = response;
      let rows = [];
      if (data) {
        rows = data.data.map((record, index) => {
          return {
            ...record,
            rowId: index + 1
          };
        });
        updateTableData({
          data: rows,
          pageSize: data.pageSize,
          pageIndex: data.pageIndex,
          totalCount: data.totalCount,
          loading: false,
          searchValues: searchValues
        });
      } else if (data == null) {
        enqueueSnackbar(`Không có dữ liệu`, {
          variant: 'warning'
        });
      }
    } catch (error) {
      enqueueSnackbar(`Failed to fetch table ${error}`, {
        variant: 'warning'
      });
    }

    updateTableData({
      loading: false
    });
  });

  const onSearch = (params, searchValues) => {
    try {
      if (params || searchValues) {
        getTableData(params, searchValues);
      }
    } catch (error) {
      console.log('Failed to add user onPageChange', error);
    }
  };

  const onDelete = async (params) => {
    try {
      if (params._id) {
        await bankTransactionRequestApi.delete(params);
      }
    } catch (error) {
      console.log('Failed to delete user', error);
    }
    getTableData();
  };

  const onAdd = async (params) => {
    try {
      if (params) {
        bankTransactionRequestApi.add(params);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  };

  const onEdit = async (params) => {
    try {
      if (params && editId) {
        bankTransactionRequestApi.edit(params, editId);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  };

  return {
    tableData,
    getTableData,
    onSearch,
    onDelete,
    onAdd,
    onEdit
  };
};

export default useTable;
