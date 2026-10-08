import React from "react";
import Section from "./Section";
import Logo from "./Logo";

// img, city, level et description sont optionnels.
// logoBg : couleur de la tuile quand le logo n'est pas fait pour un fond blanc.
const formations = [
  {
    img: "picture/logo-iscod-a-1.jpg",
    logoBg: "bg-[#252f6d]",
    href: "https://www.iscod.fr/",
    title: "Mastère Ingénierie Avancée du Logiciel",
    school: "ISCOD",
    level: "Bac+5",
    dates: "2026 – 2028",
    description: "Mastère préparé en alternance, menant au titre de Manager de l’ingénierie numérique.",
  },
  {
    img: "picture/enigma-school.jpg",
    href: "https://enigma-school.com/",
    title: "Bachelor Coordinateur de projets informatiques (applicatives)",
    school: "Enigma School",
    city: "Lille",
    level: "Bac+3",
    dates: "2022 – 2025",
    description: "Formation en alternance. Titre obtenu en septembre 2025.",
  },
  {
    img: "picture/ribot.jpg",
    href: "https://www.alexandre-ribot.fr/",
    title: "Baccalauréat NSI/Maths",
    school: "Lycée Alexandre Ribot",
    city: "Saint-Omer",
    dates: "2019 – 2022",
  },
];

const Formation = () => {
  return (
    <Section id="formations" title="Formations">
      <ul className="divide-y divide-white/20">
        {formations.map((formation) => (
          <li key={formation.title} className="py-6 first:pt-0 last:pb-0">
            <a
              href={formation.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <Logo img={formation.img} name={formation.school} bg={formation.logoBg} />
              <div className="min-w-0">
                <p className="text-xl font-bold transition-colors group-hover:text-red-500 md:text-2xl">
                  {formation.title}
                </p>
                <p className="text-lg md:text-xl">{formation.school}</p>
                <p className="flex flex-wrap gap-x-6 text-base text-white/70 md:text-lg">
                  {formation.city && <span>{formation.city}</span>}
                  {formation.level && <span>{formation.level}</span>}
                  <span>{formation.dates}</span>
                </p>
                {formation.description && <p className="mt-2 text-base md:text-lg">{formation.description}</p>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Formation;
