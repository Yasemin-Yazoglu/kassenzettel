import Image, { StaticImageData } from "next/image";
// TODO: Create dark-colored variants of the full and mark logos,
// and update the imports below to point at the new files
// (currently FullLight and MarkLight both reuse the light SVGs as placeholders).
import FullDark from "@/public/logo/kassenzettel-full.svg";
import FullLight from "@/public/logo/kassenzettel-full.svg";
import MarkDark from "@/public/logo/kassenzettel-mark.svg";
import MarkLight from "@/public/logo/kassenzettel-mark.svg";

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