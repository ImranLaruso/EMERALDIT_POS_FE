import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import FormBuilder from '../uis/FormBuilder';
import { getSupplierFormData } from '../../utilities/helpers/formHelpers/supplierForm';
import {
  updateSupplierById,
  getSupplierById,
  createSupplier,
  deleteSupplier,
} from '../../http/supplierApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi } from '../../store/actions/globalAction';
import { toast } from 'react-toastify';

const FormSupplier = ({ fetchApi }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getSupplierFormData;
      const newSupplier = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newSupplier[`${id}`] });
          }
          return null;
        });
      });
      setSupplier(newSupplier);
      setDataWithValue([...dataArray]);
    };
    const handleGetErr = err => {
      fetchApi(false);
      toast.error('Unable to get the supplier details');
    };
    if (id) {
      fetchApi(true);
      getSupplierById(id).then(handleGetSuccuess).catch(handleGetErr);
    }
  }, [fetchApi, id]);

  const handleCreateNewSupplier = newSupplier => {
    const handleCreateSuccuess = res => {
      fetchApi(false);

      push(PAGE_ROUTES.suppliers);
      toast.success('Succuessfully created');
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      toast.error('Unable to create supplier');
    };
    fetchApi(true);
    createSupplier(newSupplier)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  const handleFormSubmit = (updatedSupplier, id) => {
    const handleUpdateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.suppliers);
      toast.success('Succuessfully Updated');
    };
    const handleUpdateErr = err => {
      fetchApi(false);
      toast.error('Unable to update supplier details');
    };
    updatedSupplier.id = undefined;
    updatedSupplier.roleInPOS = undefined;
    fetchApi(true);
    updateSupplierById(id, updatedSupplier)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.suppliers);
    };
    const handleDeleteError = err => {
      fetchApi(false);
      toast.error('Unable to delete supplier');
    };
    fetchApi(true);
    deleteSupplier(supplier.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };

  if (supplier.id && dataWithValue.length) {
    const editingSupplier = { ...supplier };
    dataWithValue.forEach(field => {
      editingSupplier[`${field.id}`] = field.value;
    });
    console.log(editingSupplier);
    if (editingSupplier) {
      return (
        <FormBuilder
          title={'Edit Supplier'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={editingSupplier}
          handleDelete={handleDelete}
          buttonName={'Submit'}
        />
      );
    }
    return null;
  } else if (!id) {
    const actor = { ...supplier, gender: 'male' };
    return (
      <FormBuilder
        title={'Create new Supplier'}
        data={getSupplierFormData}
        onClick={handleCreateNewSupplier}
        actor={actor}
      />
    );
  }
  return null;
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(FormSupplier);
