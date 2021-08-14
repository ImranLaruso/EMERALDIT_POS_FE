import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getSettingsFormData } from '../../utilities/helpers/formHelpers/settingsForm';
import { updateSettingsById, getSettingsById } from '../../http/settingsApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi } from '../../store/actions/globalAction';
import { SUPPORT_EMAIL } from '../../utilities/constants';
import { toast } from 'react-toastify';

const FormSettings = ({ fetchApi }) => {
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState(getSettingsFormData);

  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getSettingsFormData;
      const newSettings = res.data;
      if (Array.isArray(res.data)) {
        Object.keys(res.data).forEach(id => {
          data.forEach(entry => {
            if (id === entry.id) {
              dataArray.push({ ...entry, value: newSettings[`${id}`] });
            }
            return null;
          });
        });
        setDataWithValue([...dataArray]);
      } else {
        toast.error('Project settings not initialzed. Please contact', {
          SUPPORT_EMAIL,
        });
      }
    };
    const handleGetErr = _err => {
      fetchApi(false);
      toast.error('Unable to get the settings details');
    };

    fetchApi(true);
    getSettingsById(1)
      .then(handleGetSuccuess)
      .catch(handleGetErr);
  }, [fetchApi]);

  const handleFormSubmit = (updatedSettings, id) => {
    const handleUpdateSuccuess = _res => {
      fetchApi(false);
      push(PAGE_ROUTES.settings);
      toast.success('Succuessfully Updated');
    };
    const handleUpdateErr = _err => {
      fetchApi(false);
      toast.error('Unable to update settings details');
    };
    updatedSettings.id = undefined;
    fetchApi(true);
    updateSettingsById(id, updatedSettings)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };
  return (
    <FormBuilder
      title={'Settings'}
      data={dataWithValue}
      onClick={handleFormSubmit}
      hideDeleteButton
      buttonName={'Save Changes'}
    />
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
};

export default connect(mapStateToProps, mapActionToProps)(FormSettings);
