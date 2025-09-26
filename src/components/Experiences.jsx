import React from "react";

const Experiences = () => {
  return (
    <div className="flex justify-center items-start min-h-screen ">
      <div className="max-w-screen-md w-full ">
        <h1 id="experiences" className="text-3xl font-bold text-center max-h-screen">
          Expériences
        </h1>
        <br />
        <div className="border-4 bg-black border-black rounded-lg p-10 transition duration-300 hover:border-red-600">
          <div className="gap-8">

            {/* ACI Industrie */}
            <div className="flex items-center">
              <img src="picture/logoACI.jpg" alt="ACI Industrie" className="w-32 h-16 mr-4" />
              <a
                href="https://aci-industrie.com/fr/"
                target="_blank"
                className="text-white text-2xl font-serif"
                rel="noreferrer"
              >
                ACI INDUSTRIE <br />
                APPRENTI DEVELOPPEUR FULL STACK <br />
                Wambrechies &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10 / 2024 – Aujourd’hui <br />
                Alternance développeur full stack : création de module Prestashop, 
                modernisation du front-end et back-end du shop, création de site Wordpress et design.
              </a>
            </div>
            <br />

            {/* Valoxy */}
            <div className="flex items-center">
              <img src="picture/logovaloxy.jpeg" alt="Valoxy" className="w-24 h-24 mr-11" />
              <a
                href="https://valoxy.org/"
                target="_blank"
                className="text-white text-2xl font-serif"
                rel="noreferrer"
              >
                VALOXY <br />
                STAGE DE DEUXIEME ANNEE <br />
                La Madeleine &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 05 / 2024 – 08 / 2024 <br />
                Refonte du blog et optimisation du référencement SEO.
              </a>
            </div>
            <br />

            {/* Prodilog */}
            <div className="flex items-center">
              <img src="picture/prodi.png" alt="Prodilog" className="w-24 h-24 mr-11" />
              <a
                href="https://www.prodilog.fr/"
                target="_blank"
                className="text-white text-2xl font-serif"
                rel="noreferrer"
              >
                PRODILOG <br />
                STAGE DE PREMIERE ANNEE <br />
                Saint-Omer &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 08 / 2023 – 09 / 2023 <br />
                Création d’un Syslog et accompagnateur du service technique en intervention.
              </a>
            </div>
            <br />

            {/* Les Déménageurs Bretons */}
            <div className="flex items-center">
              <img src="picture/deme.jpg" alt="Les Déménageurs Bretons" className="w-40 h-20 mr-4" />
              <a
                href="https://www.demenageurs-bretons.fr/"
                target="_blank"
                className="text-white text-2xl font-serif"
                rel="noreferrer"
              >
                LES DEMENAGEURS BRETONS <br />
                JOB D’ETE <br />
                Arques &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 06 / 2023 – 07 / 2023 <br />
                Intérimaire chez Addecco : travail chez les déménageurs bretons.
              </a>
            </div>
            <br />

            {/* Serres des Hauts de France */}
            <div className="flex items-center">
              <img src="picture/serre.jpg" alt="Serres des Hauts de France" className="w-32 h-16 mr-4" />
              <a
                href="https://www.facebook.com/p/Les-Serres-des-Hauts-de-France-100063743372019/?locale=fr_FR"
                target="_blank"
                className="text-white text-2xl font-serif"
                rel="noreferrer"
              >
                SERRES DES HAUTS DE FRANCE <br />
                JOB D’ETE <br />
                Arques &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 08 / 2022 – 09 / 2022 <br />
                Serres de culture de tomates : cueillette et logistique.
              </a>
            </div>
            <br />

            {/* ESA Tennis */}
            <div className="flex items-center">
              <img src="picture/tennis.jpg" alt="ESA Tennis" className="w-32 h-16 mr-4" />
              <a
                href="https://www.facebook.com/groups/337947036235821/"
                target="_blank"
                className="text-white text-2xl font-serif"
                rel="noreferrer"
              >
                ESA TENNIS <br />
                BENEVOL <br />
                Arques &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 09 / 2019 – 06 / 2020 <br />
                Assistant éducateur à l'école de tennis de l'Esa Tennis à Arques : encadrement des 6-8 ans le samedi matin (Niveau 30/0).
              </a>
            </div>

          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Experiences;
