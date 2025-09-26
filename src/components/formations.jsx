import React from "react";


const Formation = () => {
    return (
        <div className="flex justify-center items-start ">
      <div className="max-w-screen-md w-full ">
        <h1 id="formations" className="text-3xl font-bold text-center max-h-screen">Formations</h1><br />
        <div className="border-4 bg-black border-black rounded-lg p-10 transition duration-300 hover:border-red-600">
          <div className="gap-8">
            <div className="flex items-center">
              <img src="picture/enigma-school.jpg" alt="Image 1" className="w-36 h-16 mr-4" />
              <a href="https://enigma-school.com/" target="_blank" className="text-white text-3xl font-serif">
                BAC +2 Responsable de projet info. <br />
                Enigma <br />
                Lille <br />
                2022 - 2024
              </a>
            </div>
            <br />
            <div className="flex items-center">
              <img src="picture/ribot.jpg" alt="Image 2" className="w-32 h-16 mr-4" />
              <a href="https://www.alexandre-ribot.fr/" target="_blank" className="text-white text-3xl font-serif">
                BACCALAUREAT NSI/MATHS <br />
                Lycée Alexandre Ribot <br />
                Saint-Omer <br />
                2019 – 2022
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>

    );
  }
  
  export default Formation;