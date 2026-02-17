import { Libre_Barcode_128_Text } from "next/font/google";

const libre = Libre_Barcode_128_Text({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
})

export default function Logo() {
    return (
        <h1 className={`${libre.className} logo`}>kassenzettel</h1>
    );
}