import React from "react";
import Section from "./Section";

const Presentation = () => {
  return (
    <Section id="presentation" title="Présentation">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
        <img
          src="picture/henri.jpg"
          alt="Henri Mailly"
          className="aspect-[3/4] w-36 shrink-0 rounded-lg object-cover sm:w-44"
        />
        <p className="text-center text-lg leading-relaxed sm:text-left sm:text-xl md:text-2xl">
          Henri, 21 ans, apprenti développeur full stack chez Securiblock
          et étudiant en quatrième année à l'ISCOD.
          Je suis fasciné par le développement informatique.
          Mon but dans la vie? Faire disparaître les bugs
          plus vite que mon ombre et rendre le code aussi hilarant
          qu'une blague de langage de programmation&nbsp;! Qui a dit que coder devait être ennuyeux?
        </p>
      </div>
    </Section>
  );
};

export default Presentation;
