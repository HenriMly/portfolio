import React from "react";


const Presentation = () => {
    return (
        <div className="flex justify-center items-start">
  <div className="max-w-screen-md w-full mx-4 mt-8 ">
    <h1 id="presentation" className="text-3xl font-bold text-center ">Présentation</h1><br />
    <div className="border-4 bg-black border-black rounded-bl-lg p-12 transition duration-300 hover:border-red-600">
      <div className="gap-8">
        <div className="flex ">
          <img src="picture/moi2.jpg" alt="Image 2" className="rounded-r-lg h-56 mr-4" />
          <a className="text-white text-2xl font-serif">
          Henri, 20 ans, étudiant en informatique à Enigma. 
          Je suis fasciné par le développement informatique. 
          Mon but dans la vie? Faire disparaître les bugs 
          plus vite que mon ombre et rendre le code aussi hilarant 
          qu'une blague de langage de programmation ! Qui a dit que coder devait être ennuyeux?
          </a>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</div>

    );
  }
  
  export default Presentation;