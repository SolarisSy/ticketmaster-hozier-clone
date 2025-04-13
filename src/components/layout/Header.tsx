import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary-blue">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <a href="/" className="block">
            <img src="/images/logo.svg" alt="Ticketmaster Brasil" className="h-5" />
          </a>
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="px-4 py-3 absolute z-10 bg-primary-blue w-full">
          <a href="#" className="block text-white px-2 py-1">Suporte ao Fã</a>
          <a href="#" className="block text-white px-2 py-1">Entrar / Cadastre-se</a>
        </div>
      )}
    </header>
  );
};

export default Header;
