import React from "react";
import Section from "./Section";

const contacts = [
  { img: "picture/mail.jpg", label: "maillyhenri2004@gmail.com", href: "mailto:maillyhenri2004@gmail.com" },
  { img: "picture/tel.jpg", label: "0663236388", href: "tel:+33663236388" },
  { img: "picture/gi.png", label: "Github : HenriMly", href: "https://github.com/HenriMly" },
  { img: "picture/lin.png", label: "Henri Mailly", href: "https://www.linkedin.com/in/henri-mailly-a72536252/" },
];

const Coodonnees = () => {
  return (
    <Section id="coordonnees" title="Coordonnées">
      <ul className="space-y-5 sm:space-y-6">
        {contacts.map((contact) => {
          // Seuls les liens web s'ouvrent dans un nouvel onglet (pas mailto: ni tel:)
          const external = contact.href.startsWith("http");

          return (
            <li key={contact.href}>
              <a
                href={contact.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="flex items-center gap-4 text-base transition-colors hover:text-red-500 sm:text-xl md:text-2xl"
              >
                <img
                  src={contact.img}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-md bg-white object-contain p-1 md:h-14 md:w-14"
                />
                <span className="min-w-0 break-words">{contact.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default Coodonnees;
