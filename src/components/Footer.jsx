import React from "react";

const links = [
  { href: "#presentation", label: "Profil" },
  { href: "#informations", label: "Informations" },
  { href: "#competences", label: "Compétences" },
  { href: "#formations", label: "Formations" },
  { href: "#experiences", label: "Expériences" },
  { href: "#coordonnees", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="bg-red-600 px-4 py-5 text-white sm:px-6 lg:pl-52 lg:pr-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center lg:flex-row lg:justify-between">
        <p>Réalisé avec React.js</p>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
