import { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './DropdownMenu.css'; // Styling for dropdown

interface DropdownMenuProps {
  closeDropdown: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ closeDropdown }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

  const navAndReload = (page: string) => {
    navigate(page, { replace: true });
  }

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    // Add event listener when dropdown is opened
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when dropdown is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  return (
    <div className="dropdown-menu" ref={dropdownRef}>
      <ul>
        <li onClick={() => navAndReload('/account')} >Profile</li>
        <li>Settings</li>
        {isAuthenticated ?
          <li onClick={() => logout()}>Sign out</li>
          :
          <li onClick={() => loginWithRedirect()}>Sign up</li>
        }
      </ul>
    </div>
  );
};

export default DropdownMenu;
