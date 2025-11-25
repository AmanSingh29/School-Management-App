import LogoutIcon from '../assets/icons/LogoutIcon.svg';
import ProfileIcon from '../assets/icons/ProfileCircleIcon.svg';
import HomeIcon from '../assets/icons/home-4-svgrepo-com.svg';
import AboutIcon from '../assets/icons/about-svgrepo-com.svg';
import SettingsIcon from '../assets/icons/settings-svgrepo-com.svg';

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
      title: 'Home',
      onPress: () => {
        goToProfile();
        closeDrawer();
      },
      icon: HomeIcon,
    },
    {
      title: 'Profile',
      onPress: () => {
        goToProfile();
        closeDrawer();
      },
      icon: ProfileIcon,
    },
    {
      title: 'About School',
      onPress: async () => {
        await logout();
        closeDrawer();
      },
      icon: AboutIcon,
    },
    {
      title: 'Settings',
      onPress: async () => {
        await logout();
        closeDrawer();
      },
      icon: SettingsIcon,
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
