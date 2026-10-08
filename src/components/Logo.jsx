import React from "react";

// Tuile du logo (formations et expériences).
// Sans image, le nom s'affiche à la place.
// bg : couleur de la tuile (classe Tailwind), blanche par défaut.
const Logo = ({ img, name, bg = "bg-white" }) => {
  const tileClass = `h-16 w-40 shrink-0 rounded-md sm:h-20 ${bg}`;

  if (!img) {
    return (
      <div
        className={`${tileClass} flex items-center justify-center break-words p-2 text-center font-sans text-sm font-bold leading-tight text-black`}
      >
        {name}
      </div>
    );
  }

  return <img src={img} alt={name} className={`${tileClass} object-contain p-1.5`} />;
};

export default Logo;
