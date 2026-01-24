export interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NavRoute {
  label: string;
  icon: string;
  path: string;
}