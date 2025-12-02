export default function Footer() {
    return (
        <>
            <footer className="container-fluid bg-dark mt-5" style={{ minHeight: "37dvh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
                <div className="container pt-4">
                    <h1 className="text-white">Dev Team</h1>
                    <hr className="border border-danger" />
                    <p className="text-white">Hecho por Kevin Salvatierra y Fernando Huamanchumo</p>
                    <p></p>
                </div>
            </footer>
        </>
    )
}