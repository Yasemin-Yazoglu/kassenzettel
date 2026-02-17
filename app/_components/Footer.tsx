export default function Footer() {
    const date = new Date();
    return (
        <p>&copy; Yasemin Yazoglu, {date.getFullYear()}</p>
    )
}