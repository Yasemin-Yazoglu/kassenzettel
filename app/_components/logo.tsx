import { Libre_Barcode_128_Text } from "next/font/google";

const libre = Libre_Barcode_128_Text({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
})

type LogoProps = {
    size?: number;
}

export default function Logo({ size = 100 }: LogoProps) {
    return <h1 className={libre.className} style={{ fontSize: size }}>kassenzettel</h1>
}