import LogoutIcon from '../assets/icons/LogoutIcon.svg';
import ProfileIcon from '../assets/icons/ProfileCircleIcon.svg';

type Handlers = {
  goToProfile: () => void;
  logout: () => Promise<void> | void;
  closeDrawer: () => void;
};

export const createDrawerOptions = ({
  goToProfile,
  logout,
  closeDrawer,
}: Handlers) =>
  [
    {
      title: 'My Profile',
      onPress: () => {
        goToProfile();
        closeDrawer();
      },
      icon: ProfileIcon,
    },
    {
      title: 'Logout',
      onPress: async () => {
        await logout();
        closeDrawer();
      },
      icon: LogoutIcon,
    },
  ] as const;
