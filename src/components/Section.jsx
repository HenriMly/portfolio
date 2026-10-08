import React from "react";

// Bloc commun à toutes les sections : titre + carte noire.
// Les paddings et espacements se règlent ici, une seule fois.
const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="scroll-mt-20 lg:scroll-mt-8">
      <h2 className="mb-5 text-center text-2xl font-bold sm:mb-6 sm:text-3xl">{title}</h2>
      <div className="rounded-lg border-4 border-black bg-black p-5 font-serif text-white transition duration-300 hover:border-red-600 sm:p-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
