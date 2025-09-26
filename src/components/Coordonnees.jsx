import React from "react";


const Coodonnees = () => {
    return (
        <div className="flex justify-center items-start ">
      <div className="max-w-screen-md w-full ">
        <h1 id="coordonnees" className="text-3xl font-bold text-center max-h-screen">Coordonnées</h1><br />
        <div className="border-4 bg-black border-black rounded-lg p-10 transition duration-300 hover:border-red-600">
          <div className="gap-8">
            <div className="flex items-center">
            <img src="picture/mail.jpg" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="mailto:maillyhenri2004@gmail.com" target="_blank" className="text-white text-2xl font-serif">
                maillyhenri2004@gmail.com
              </a>
            </div>
            <br />
            <div className="flex items-center">
            <img src="picture/tel.jpg" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="tel:+33663236388" target="_blank" className="text-white text-2xl font-serif">
                0663236388
              </a>
            </div><br />
            <div className="flex items-center">
            <img src="picture/gi.png" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="https://github.com/Arhoverse" target="_blank" className="text-white text-2xl font-serif">
                Github : Arhoverse
              </a>
            </div><br />
            <div className="flex items-center">
            <img src="picture/lin.png" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="https://www.linkedin.com/in/henri-mailly-a72536252/" target="_blank" className="text-white text-2xl font-serif">
                Henri Mailly
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>

    );
  }
  
  export default Coodonnees;