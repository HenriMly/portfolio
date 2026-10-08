import React from "react";
import Section from "./Section";
import Logo from "./Logo";

// img, href, city et description sont optionnels.
// logoBg : couleur de la tuile quand le logo n'est pas fait pour un fond blanc.
const experiences = [
  {
    img: "picture/logo-securiblock-long.png",
    company: "SECURIBLOCK",
    role: "Alternance développeur full stack",
    dates: "09 / 2026 – Aujourd’hui",
    description:
      "Refonte de site WordPress en Next.js, création d’un dashboard d’administration en Laravel + Filament, mise en place d’automatisations complètes propulsées par l’IA.",
  },
  {
    img: "picture/dkgroup.svg",
    logoBg: "bg-neutral-800",
    company: "KODO",
    role: "Alternance développeur Odoo",
    city: "Dourges",
    dates: "01 / 2026 – 04 / 2026",
    description: "Création de modules Odoo et migration de données.",
  },
  {
    img: "picture/logoACI.jpg",
    href: "https://aci-industrie.com/fr/",
    company: "ACI INDUSTRIE",
    role: "Alternance développeur full stack",
    city: "Wambrechies",
    dates: "10 / 2024 – 09 / 2025",
    description:
      "Développement et évolution des solutions web de l’entreprise : création de modules PrestaShop, modernisation du front et back du site e-commerce, création de sites WordPress et intégration de designs.",
  },
  {
    img: "picture/logovaloxy.jpeg",
    href: "https://valoxy.org/",
    company: "VALOXY",
    role: "Stage développeur web",
    city: "La Madeleine",
    dates: "05 / 2024 – 08 / 2024",
    description:
      "Développement web : refonte du blog, amélioration de l’expérience utilisateur et optimisation du référencement SEO afin d’augmenter la visibilité du site.",
  },
  {
    img: "picture/prodi.png",
    href: "https://www.prodilog.fr/",
    company: "PRODILOG",
    role: "Stage systèmes et réseaux",
    city: "Saint-Omer",
    dates: "08 / 2023 – 09 / 2023",
    description:
      "Mise en place d’un serveur Syslog, support technique et assistance aux techniciens en intervention.",
  },
  {
    img: "picture/deme.jpg",
    href: "https://www.demenageurs-bretons.fr/",
    company: "LES DEMENAGEURS BRETONS",
    role: "Job d’été",
    city: "Arques",
    dates: "06 / 2023 – 07 / 2023",
    description: "Intérimaire chez Addecco : travail chez les déménageurs bretons.",
  },
  {
    img: "picture/serre.jpg",
    href: "https://www.facebook.com/p/Les-Serres-des-Hauts-de-France-100063743372019/?locale=fr_FR",
    company: "SERRES DES HAUTS DE FRANCE",
    role: "Job d’été",
    city: "Arques",
    dates: "08 / 2022 – 09 / 2022",
    description: "Serres de culture de tomates : cueillette et logistique.",
  },
  {
    img: "picture/tennis.jpg",
    href: "https://www.facebook.com/groups/337947036235821/",
    company: "ESA TENNIS",
    role: "Bénévole",
    city: "Arques",
    dates: "09 / 2019 – 06 / 2020",
    description:
      "Assistant éducateur à l'école de tennis de l'Esa Tennis à Arques : encadrement des 6-8 ans le samedi matin (Niveau 30/0).",
  },
];

const itemClass = "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6";

const Experiences = () => {
  return (
    <Section id="experiences" title="Expériences">
      <ul className="divide-y divide-white/20">
        {experiences.map((experience) => {
          const content = (
            <>
              <Logo img={experience.img} name={experience.company} bg={experience.logoBg} />
              <div className="min-w-0">
                <p className="text-xl font-bold transition-colors group-hover:text-red-500 md:text-2xl">
                  {experience.company}
                </p>
                <p className="text-base md:text-lg">{experience.role}</p>
                <p className="flex flex-wrap gap-x-6 text-sm text-white/70 md:text-base">
                  {experience.city && <span>{experience.city}</span>}
                  <span>{experience.dates}</span>
                </p>
                {experience.description && <p className="mt-2 text-base md:text-lg">{experience.description}</p>}
              </div>
            </>
          );

          return (
            <li key={experience.company} className="py-6 first:pt-0 last:pb-0">
              {experience.href ? (
                <a href={experience.href} target="_blank" rel="noreferrer" className={`group ${itemClass}`}>
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

export default Experiences;
