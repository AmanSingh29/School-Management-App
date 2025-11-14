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
    },
    {
      title: 'Logout',
      onPress: async () => {
        await logout();
        closeDrawer();
      },
    },
  ] as const;
