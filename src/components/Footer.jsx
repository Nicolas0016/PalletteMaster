import { Github } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-900 sm:text-center dark:text-gray-400">
          Ningun derecho reservado.
        </span>
        <ul className="flex gap-5 text-white">
          <li>
            <a
              href="https://github.com/Nicolas0016/PalletteMaster"
              className="opacity-60 hover:opacity-100 h-[50px]"
              title="link to repository"
            >
              <Github />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
