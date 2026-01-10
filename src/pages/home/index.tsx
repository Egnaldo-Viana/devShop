import { BsCartPlus } from 'react-icons/bs';

export function Home() {
  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center ">
          Produtos em alta
        </h1>
        <div className="grid grid-cols-1 gap-6 mb:grid-cols-2 lg:grid-cols-5">
          <section className="w-full ">
            <img
              className="w-full rounded-lg max-h-70 mb-2"
              src="data:image/jpeg;base64,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"
              alt="logo do produto"
            />
            <p className="font-medium mt-1 mb-2">Airpods Pro</p>
            <div className="flex gap-3 items-center">
              <strong className="text-zinc-700/90">R$ 1000</strong>
              <button className="bg-zinc-900 p-1 rounded">
                <BsCartPlus size={29} color="#fff" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
