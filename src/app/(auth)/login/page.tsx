import Head from "next/head";
import Image from "next/image";
import loginImage from "@/assets/loginImage.png";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Head>
        <title>Masuk</title>
      </Head>

      <div className=" w-full max-w-md p-8">
        <Image
          src={loginImage}
          width={300}
          height={300}
          alt="login image"
          className="mx-auto object-cover"
        />
        <h2 className="mb-6 text-3xl font-semibold  text-gray-700">Masuk</h2>
        <p className="mb-6 text-sm  text-green-prim">Masuk ke Akun</p>
        <form>
          <div className="mb-4">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium ">
              Nama Pengguna
            </label>
            <input
              type="text"
              id="nama"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Nama pengguna"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2  border rounded-lg focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-btn rounded-lg focus:outline-none"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
