import { iconMap, type IconName } from "@/components/icons";

export function Icon({
  name,
  className = "",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  const IconComponent = iconMap[name as IconName];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={`icon ${className}`} filled={filled} />;
}
