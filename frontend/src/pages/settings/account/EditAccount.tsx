import '../Settings.css';
import { useState } from 'react';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import SettingsSidebar from '../sidebar/SettingsSidebar';
import DeleteAccount from "../../../components/delete-account/DeleteAccount";

import SuccessAlert from '../../../components/SuccessAlert';
import ErrorAlert from '../../../components/ErrorAlert';

const EditAccount: React.FC = () => {
  const { user, logout } = useAuth0();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleDeleteAccount = async () => {
    try {
      console.log('Account deletion process initiated.');
      const userEdit = await axios.post('http://localhost:8080/api/user/name/' + user.name);
      await axios.delete('http://localhost:8080/api/user/' + userEdit.data[0].id + '/' + user.sub);
      console.log('localhost:8080/api/user/' + userEdit.data[0].id)
      setIsSuccess(true);
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsError(true);
    }
  };

  return <div className="main-content-settings">
    <SettingsSidebar />
    <div className='settings-content-layout'>
      <h1>Account</h1>
      <DeleteAccount onDelete={handleDeleteAccount} />
    </div>

    <SuccessAlert
      message={"Account successfully deleted."}
      showAlert={isSuccess}
      setShowAlert={setIsSuccess}
    />
    <ErrorAlert
      message={"Failed to delete account."}
      showAlert={isError}
      setShowAlert={setIsError}
    />
  </div>;
};

export default EditAccount;