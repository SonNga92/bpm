import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@material-ui/core';
import accountApi from '../../api/accountApi';
import Table from './components/Table';
import FormPopup from './components/FormPopup';
import SearchForm from './components/SearchForm';

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');

  const getTableData = useCallback(async () => {
    try {
      const response = await accountApi.getAll({});
      setTableData(response);
    } catch (error) {
      console.log('Failed to fetch table', error);
    }
  }, [tableData]);

  useEffect(() => {
    getTableData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    handleOpen();
    setFormType('add');
  };

  const handleEdit = (values) => {
    if (values) {
      setValue('firstName', values.firstName);
      setValue('lastName', values.lastName);
      setValue('phone', values.phone);
      setValue('age', values.age);
      setEditId(values._id);
      handleOpen();
      setFormType('edit');
    }
  };

  const onDelete = async (values) => {
    try {
      if (values._id) {
        await userApi.delete(values);
      }
    } catch (error) {
      console.log('Failed to delete user', error);
    }
    getTableData();
  };

  const onAdd = useCallback(async (values) => {
    try {
      if (values) {
        userApi.add(values);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  }, []);

  const onEdit = useCallback(async (values) => {
    try {
      if (values && editId) {
        userApi.edit(values, editId);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  }, []);

  return (
    <>
      <SearchForm />

      <div style={{ padding: '5px' }}></div>

      <Table
        tableData={tableData}
        handleEdit={handleEdit}
        onDelete={onDelete}
        getTableData={getTableData}
        handleAdd={handleAdd}
      />

      <FormPopup
        open={open}
        handleClose={handleClose}
        formType={formType}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </>
  );
};

export default Homepage;
