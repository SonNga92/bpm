import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import accountApi from '../../../../api/accountApi';

const useTable = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);

  const fetchData = async (params) => {
    try {
      const response = await accountApi.getAll(params);
      console.log(response.data);
      response.data && setTableData(response.data);
    } catch (error) {
      enqueueSnackbar(`Failed to fetch table ${error}`, {
        variant: 'warning'
      });
    }
  };

  const getTableData = (params) => {
    fetchData(params);
  };

  const onSearch = (searchValues) => {
    accountApi.search({ pageindex: 1, pagesize: 10, searchValues });
  };

  const onPageChange = (page) => {
    fetchData({ page });
  };

  const onPageSizeChange = (pageSize) => {
    if (searchValues) {
      fetchData({ pageSize });
    }
  };

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
