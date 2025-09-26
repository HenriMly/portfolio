import React from "react";


const Profil = () => {
    return (
      <div className="flex justify-center items-start ">
      <div className="max-w-screen-md w-full ">
        <h1 id="informations" className="text-3xl font-bold text-center max-h-screen">Informations personnelles </h1><br />
        <div className="border-4 bg-black border-black rounded-lg p-10 transition duration-300 hover:border-red-600">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center">
              <img src="picture/gateau.jpg" alt="Image 1" className="w-16 h-16 mr-4" />
              <a href="https://www.google.com/search?sa=X&sca_esv=6fbc5b85f7533cfa&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQ_pbg5bWizQs3A_kIenjtcpTTqBUdyVgzq0c3_k8z34EAuM72an33lMW6RWde9ePJpwNFtZw3UQvFloZy04_0a2t90M1pjb-hlKRN5_Y-eT7ZEcVhb6tlz5ZvzwJfgnPcI9sO9tdtG4H8zxL-DrxbEkQcUjNRbZ70noEbDq9g2_ndCyCt&q=20+ans&ved=2ahUKEwjz38O5s_ePAxXQVKQEHULLFJAQtKgLegQIEBAB&biw=1920&bih=911&dpr=1" target="_blank" className="text-white text-3xl font-serif">
                20 ans
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/loca.jpg" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="https://www.google.com/maps/place/Fives/@50.6325257,3.089385,1650m/data=!3m1!1e3!4m6!3m5!1s0x47c2d5fbd9e56125:0x289d18f335eb5e1e!8m2!3d50.63294!4d3.0906735!16s%2Fg%2F12240nwp?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="text-white text-3xl font-serif">
                Métropole Lilloise
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/anglais.png" alt="Image 3" className="w-16 h-16 mr-4" />
              <a href="https://www.youtube.com/watch?v=VH8pSfyOw48" target="_blank" className="text-white text-3xl font-serif">
                Anglais-Français
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/voiture.jpg" alt="Image 4" className="w-16 h-16 mr-4" />
              <a href="https://www.alpinecars.fr/gamme/a110-r.html" target="_blank" className="text-white text-3xl font-sans">
                Permis B
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/haltere.jpg" alt="Image 5" className="w-16 h-16 mr-4" />
              <a href="https://www.instagram.com/henri.sport/?hl=fr" target="_blank" className="text-white text-3xl font-sans">
                Musculation
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/F1.jpg" alt="Image 6" className="w-16 h-16 mr-4" />
              <a href="https://www.youtube.com/watch?v=aS4Me48wayM" target="_blank" className="text-white text-3xl font-sans">
                Automobile
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
  
  export default Profil;