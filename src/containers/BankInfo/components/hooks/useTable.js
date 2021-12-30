import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import bankInfoApi from '../../../../api/bankInfoApi';

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
      const response = await bankInfoApi.getAll(params);
      const { data } = response;
      data && setTableData(data);
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
    bankInfoApi.search(params);
  };

  const onPageChange = useCallback((params) => {
    try {
      if (params) {
        fetchData(params);
      }
    } catch (error) {
      console.log('Failed to add user onPageChange', error);
    }
  });

  const onPageSizeChange = useCallback((params) => {
    try {
      if (params) {
        fetchData(params);
      }
    } catch (error) {
      console.log('Failed to add user onPageSizeChange', error);
    }
  });

  const onDelete = async (params) => {
    try {
      if (params._id) {
        await bankInfoApi.delete(params);
      }
    } catch (error) {
      console.log('Failed to delete user', error);
    }
    getTableData();
  };

  const onAdd = async (params) => {
    try {
      if (params) {
        bankInfoApi.add(params);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  };

  const onEdit = async (params) => {
    try {
      if (params && editId) {
        bankInfoApi.edit(params, editId);
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
