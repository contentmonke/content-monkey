import '../Settings.css';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import SettingsSidebar from '../sidebar/SettingsSidebar';
import DeleteAccount from "../../../components/delete-account/DeleteAccount";

const EditAccount: React.FC = () => {
  const { user, logout } = useAuth0();


  const handleDeleteAccount = async () => {
    try {
      console.log('Account deletion process initiated.');
      const userEdit = await axios.post('http://localhost:8080/api/user/name/' + user.name);
      console.log(user.sub);
      const userDel = await axios.delete('http://localhost:8080/api/user/' + userEdit.data[0].id + '/' + user.sub);
      console.log('localhost:8080/api/user/' + userEdit.data[0].id)
      alert('Account successfully deleted.');
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  return <div className="main-content-settings">
    <SettingsSidebar />
    <div className='settings-content-layout'>
      <h1>Account</h1>
      <DeleteAccount onDelete={handleDeleteAccount} />
    </div>
  </div>;
};

export default EditAccount;