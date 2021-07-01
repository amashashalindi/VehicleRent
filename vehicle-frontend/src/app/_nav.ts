
interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Rented Vehicles',
    url: '/rented-vehicles',
    icon: 'fa fa-handshake-o',
  },
  {
    name: 'Vehicles',
    url: '/vehicles',
    icon: 'fa fa-car',
  },
  {
    name: 'Clients',
    url: '/clients',
    icon: 'fa fa-users',
  },
];