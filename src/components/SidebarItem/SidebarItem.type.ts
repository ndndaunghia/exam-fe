interface SidebarItemType {
  title: string;
  type: string;
  labels: string[];
  subjects?: Array<{ id: string; name: string }>;
  selectedValues?: string[];
  onSelect?: (label: string, checked: boolean) => void;
}

export default SidebarItemType;
