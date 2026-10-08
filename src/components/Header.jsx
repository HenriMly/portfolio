import React, { useState } from "react";

const links = [
  { href: "#presentation", label: "Profil" },
  { href: "#informations", label: "Informations" },
  { href: "#competences", label: "Compétences" },
  { href: "#formations", label: "Formations" },
  { href: "#experiences", label: "Expériences" },
  { href: "#coordonnees", label: "Coordonnées" },
];

const linkClass =
  "rounded-md border-2 border-white px-3 py-2 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-red-600";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile et tablette : barre en haut + menu déroulant */}
      <header className="sticky top-0 z-20 bg-red-600 lg:hidden">
        <div className="flex h-14 items-center justify-between border-b-2 border-black px-4 sm:px-6">
          <a href="#presentation" className="text-lg font-bold text-white">
            Henri Mailly
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full grid grid-cols-2 gap-2 border-b-2 border-black bg-red-600 p-4 shadow-lg sm:grid-cols-3 sm:px-6"
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={`${linkClass} text-center`}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Desktop : menu latéral fixe, centré verticalement */}
      <nav className="fixed left-0 top-1/2 z-20 hidden w-44 -translate-y-1/2 flex-col gap-4 rounded-r-lg border-2 border-l-0 border-black bg-red-600 px-5 py-8 transition duration-300 ease-in-out hover:shadow-lg lg:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={`${linkClass} hover:scale-110`}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
};

export default Header;
