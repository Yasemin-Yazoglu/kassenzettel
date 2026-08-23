import Image, { StaticImageData } from "next/image";
import FullDark from "@/public/logo/kassenzettel-full-dark.svg";
import FullLight from "@/public/logo/kassenzettel-full-light.svg";
import MarkDark from "@/public/logo/kassenzettel-mark-dark.svg";
import MarkLight from "@/public/logo/kassenzettel-mark-light.svg";

type LogoVariant = "full" | "mark";
type LogoColor = "dark" | "light";

interface Props {
    variant?: LogoVariant;
    color?: LogoColor;
    className?: string;
}

const LOGOS: Record<LogoVariant, Record<LogoColor, StaticImageData>> = {
    full: { dark: FullDark, light: FullLight },
    mark: { dark: MarkDark, light: MarkLight },
};

export default function Logo({
    variant = "full",
    color = "light",
    className = "",
}: Props) {
    return (
        <Image 
            src={LOGOS[variant][color]} 
            alt="Kassenzettel" 
            className={className} 
        />
    );
}