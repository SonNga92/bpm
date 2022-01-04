import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import accountApi from '../../../../api/accountApi';

const useTable = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    data: []
  });

  const fetchData = useCallback(async (params) => {
    try {
      const response = await accountApi.getAll(params);
      if (response) {
        const { data } = response;
        setTableData({ data: data });
      }
    } catch (error) {
      enqueueSnackbar(`Failed to fetch table ${error}`, {
        variant: 'warning'
      });
    }
  });

  const getTableData = (params) => {
    fetchData({ pageindex: 1, pagesize: 10 });
  };

  const onSearch = (params) => {
    accountApi.search(params);
  };

  const onPageChange = useCallback((params) => {
    try {
      if (params) {
        fetchData(params);
      }
    } catch (error) {
      enqueueSnackbar(`Failed to fetch table ${error}`, {
        variant: 'warning'
      });
    }
  });

  const onPageSizeChange = useCallback((params) => {
    try {
      if (params) {
        fetchData(params);
      }
    } catch (error) {
      enqueueSnackbar(`Failed to fetch table ${error}`, {
        variant: 'warning'
      });
    }
  });

  const onDelete = async (values) => {
    try {
      if (values._id) {
        await accountApi.delete(values);
      }
    } catch (error) {
      console.log('Failed to delete user', error);
    }
    getTableData();
  };

  const onAdd = async (values) => {
    try {
      if (values) {
        accountApi.add(values);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  };

  const onEdit = async (values) => {
    try {
      if (values && editId) {
        accountApi.edit(values, editId);
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
    onPageChange,
    onPageSizeChange,
    onDelete,
    onAdd,
    onEdit
  };
};

export default useTable;
