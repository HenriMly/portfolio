import React from "react";


const Footer = () => {
    return (
        <footer className="bg-red-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p>Réalisé avec React.js</p>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li><a href="#presentation" className="hover:white">Profil</a></li>
                        <li><a href="#informations" className="hover:white">Informations</a></li>
                        <li><a href="#competences" className="hover:white">Compétences</a></li>
                        <li><a href="#formations" className="hover:white">Formations</a></li>
                        <li><a href="#experiences" className="hover:white">Expériences</a></li>
                        <li><a href="#coordonnees" className="hover:white">Contact</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
  }
  
  export default Footer;