import Edit from '@/public/icons/edit.svg';
import Close from '@/public/icons/close.svg';

const icons = {
    editIcon: Edit,
    closeIcon: Close,
};

type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName; className?: string }) {
    const IconComponent = icons[name];
    return <IconComponent style={{ flexShrink: 0 }} {...props} />;
};