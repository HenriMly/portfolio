import React from "react";
import Section from "./Section";

// href est optionnel : sans lien, la compétence est affichée en simple texte.
// img est optionnel : sans logo, l'initiale s'affiche dans la tuile.
const competences = [
  { img: "picture/react-next.png", label: "React.js / Next.js", href: "https://github.com/Arhoverse/E.S-Arques-tennis" },
  { img: "picture/JavaScript-logo.png", label: "JavaScript", href: "https://github.com/Arhoverse/Todolist-" },
  { img: "picture/226777_738cec596d.png", label: "Java", href: "https://github.com/Arhoverse/BattleShip" },
  { img: "picture/c.png", label: "C, C++, C#" },
  { img: "picture/python.jpg", label: "Python" },
  { img: "picture/Odoo_logo_rgb.svg.png", label: "Odoo" },
  { img: "picture/Html-css.png", label: "HTML / CSS", href: "https://github.com/Arhoverse/Todolist-" },
  { img: "picture/sql.png", label: "SQL" },
  { img: "picture/WP.png", label: "WordPress" },
  { img: "picture/presta.png", label: "Prestashop" },
  { img: "picture/php.png", label: "PHP" },
  { img: "picture/uefn.png", label: "UEFN", href: "https://www.fortnite.com/@arhoverse" },
  { img: "picture/git.png", label: "Git", href: "https://github.com/HenriMly" },
  { img: "picture/ccna.png", label: "CCNA3" },
];

const itemClass = "flex items-center gap-4 text-xl md:text-2xl";
const tileClass = "h-12 w-12 shrink-0 rounded-md bg-white md:h-14 md:w-14";

const Competences = () => {
  return (
    <Section id="competences" title="Compétences">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
        {competences.map((competence) => {
          const content = (
            <>
              {competence.img ? (
                <img src={competence.img} alt="" className={`${tileClass} object-contain p-1`} />
              ) : (
                <span
                  aria-hidden="true"
                  className={`${tileClass} flex items-center justify-center font-sans text-2xl font-bold text-black`}
                >
                  {competence.label[0]}
                </span>
              )}
              <span className="min-w-0 break-words">{competence.label}</span>
            </>
          );

          return (
            <li key={competence.label}>
              {competence.href ? (
                <a
                  href={competence.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${itemClass} transition-colors hover:text-red-500`}
                >
                  {content}
                </a>
              ) : (
                <div className={itemClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default Competences;
