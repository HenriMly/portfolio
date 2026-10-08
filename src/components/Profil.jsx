import React from "react";
import Section from "./Section";

// href est optionnel : sans lien, l'info est affichée en simple texte.
const infos = [
  {
    img: "picture/gateau.jpg",
    label: "21 ans",
    href: "https://www.google.com/search?sa=X&sca_esv=6fbc5b85f7533cfa&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQ_pbg5bWizQs3A_kIenjtcpTTqBUdyVgzq0c3_k8z34EAuM72an33lMW6RWde9ePJpwNFtZw3UQvFloZy04_0a2t90M1pjb-hlKRN5_Y-eT7ZEcVhb6tlz5ZvzwJfgnPcI9sO9tdtG4H8zxL-DrxbEkQcUjNRbZ70noEbDq9g2_ndCyCt&q=20+ans&ved=2ahUKEwjz38O5s_ePAxXQVKQEHULLFJAQtKgLegQIEBAB&biw=1920&bih=911&dpr=1",
  },
  {
    img: "picture/loca.jpg",
    label: "Métropole Lilloise",
    href: "https://www.google.com/maps/place/Fives/@50.6325257,3.089385,1650m/data=!3m1!1e3!4m6!3m5!1s0x47c2d5fbd9e56125:0x289d18f335eb5e1e!8m2!3d50.63294!4d3.0906735!16s%2Fg%2F12240nwp?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D",
  },
  { img: "picture/anglais.png", label: "Anglais-Français", href: "https://www.youtube.com/watch?v=VH8pSfyOw48" },
  { img: "picture/voiture.jpg", label: "Permis B", href: "https://www.alpinecars.fr/gamme/a110-r.html" },
  { img: "picture/haltere.jpg", label: "Musculation", href: "https://www.instagram.com/henri.sport/?hl=fr" },
  {
    img: "picture/Teletech_UK_Logo.png",
    label: "Musique",
    href: "https://www.youtube.com/watch?v=NuwR0Rd3FGM&list=RDNuwR0Rd3FGM&start_radio=1",
  },
  { img: "picture/F1.jpg", label: "Automobile", href: "https://www.youtube.com/watch?v=aS4Me48wayM" },
];

const itemClass = "flex items-center gap-4 text-xl md:text-2xl";

const Profil = () => {
  return (
    <Section id="informations" title="Informations personnelles">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
        {infos.map((info) => {
          const content = (
            <>
              <img
                src={info.img}
                alt=""
                className="h-12 w-12 shrink-0 rounded-md bg-white object-contain p-1 md:h-14 md:w-14"
              />
              <span className="min-w-0 break-words">{info.label}</span>
            </>
          );

          return (
            <li key={info.label}>
              {info.href ? (
                <a
                  href={info.href}
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

export default Profil;
