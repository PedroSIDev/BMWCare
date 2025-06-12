export default function dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-10">
                Bem-vindo ao Painel de Controle
            </h1>
            <p className="text-center mt-4">
                Esta é a página inicial do seu dashboard.
            </p>
            <div className="flex justify-center mt-8">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Ação Principal
                </button>
            </div>
        </div>
    )
}