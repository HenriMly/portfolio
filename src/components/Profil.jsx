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
              <a href="https://www.google.com/search?q=10+9&sca_esv=f3458d61af57fc2d&udm=2&biw=1920&bih=911&sxsrf=ACQVn0_LXzGML4hsY2eGi89e27ZqO_aIqA%3A1711702382141&ei=boEGZoqnCKeIkdUPuZuBiAQ&ved=0ahUKEwiKlsujjJmFAxUnRKQEHblNAEEQ4dUDCBE&uact=5&oq=10+9&gs_lp=Egxnd3Mtd2l6LXNlcnAiBDEwIDkyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgQQABgeMgQQABgeMgQQABgeMgQQABgeMgQQABgeMgQQABgeSIIlUPQTWK4hcAR4AJABAJgBN6ABzQGqAQE0uAEDyAEA-AEBmAIIoAL0AagCCsICChAAGIAEGIoFGEPCAggQABiABBixA8ICBBAjGCfCAg0QABiABBiKBRhDGLEDwgIHECMY6gIYJ8ICBBAAGAOYAweIBgGSBwE4oAfKEw&sclient=gws-wiz-serp#vhid=bCRrwp7unhsGEM&vssid=mosaic" target="_blank" className="text-white text-3xl font-serif">
                19 ans
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/loca.jpg" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="https://www.google.fr/maps/place/Saint-Omer/@50.7727386,2.244923,13.25z/data=!4m6!3m5!1s0x47dcf893912760af:0x40af13e8163d5e0!8m2!3d50.7522828!4d2.2543638!16zL20vMDE3ZnBo?entry=ttu" target="_blank" className="text-white text-3xl font-serif">
                Saint-omer
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