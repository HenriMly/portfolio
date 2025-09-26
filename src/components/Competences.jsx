import React from "react";

const Competences = () => {
  return (
    <div className="flex justify-center items-start ">
      <div className="max-w-screen-md w-full ">
        <h1 id="competences" className="text-3xl font-bold text-center max-h-screen">
          Compétences
        </h1>
        <br />
        <div className="border-4 bg-black border-black rounded-lg p-10 transition duration-300 hover:border-red-600">
          <div className="grid grid-cols-2 gap-8">

            {/* React / Next.js */}
            <div className="flex items-center">
              <img src="picture/react-next.png" alt="React/Next.js" className="w-20 h-12 mr-4" />
              <a
                href="https://github.com/Arhoverse/E.S-Arques-tennis"
                target="_blank"
                rel="noreferrer"
                className="text-white text-3xl font-serif"
              >
                React.js / Next.js
              </a>
            </div>

            {/* JavaScript */}
            <div className="flex items-center">
              <img src="picture/JavaScript-logo.png" alt="JavaScript" className="w-16 h-16 mr-4" />
              <a
                href="https://github.com/Arhoverse/Todolist-"
                target="_blank"
                rel="noreferrer"
                className="text-white text-3xl font-serif"
              >
                JavaScript
              </a>
            </div>

            {/* Java */}
            <div className="flex items-center">
              <img src="picture/226777_738cec596d.png" alt="Java" className="w-16 h-16 mr-4" />
              <a
                href="https://github.com/Arhoverse/BattleShip"
                target="_blank"
                rel="noreferrer"
                className="text-white text-3xl font-serif"
              >
                Java
              </a>
            </div>

            {/* C / C++ / C# */}
            <div className="flex items-center">
              <img src="picture/c.png" alt="C / C++ / C#" className="w-14 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">C, C++, C#</p>
            </div>

            {/* Python */}
            <div className="flex items-center">
              <img src="picture/python.jpg" alt="Python" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">Python</p>
            </div>

            {/* HTML / CSS */}
            <div className="flex items-center">
              <img src="picture/Html-css.png" alt="HTML/CSS" className="w-20 h-16 mr-4" />
              <a
                href="https://github.com/Arhoverse/Todolist-"
                target="_blank"
                rel="noreferrer"
                className="text-white text-3xl font-sans"
              >
                HTML / CSS
              </a>
            </div>

            {/* SQL */}
            <div className="flex items-center">
              <img src="picture/sql.png" alt="SQL" className="w-20 h-10 mr-4" />
              <p className="text-white text-3xl font-sans">SQL</p>
            </div>

            {/* WordPress */}
            <div className="flex items-center">
              <img src="picture/WP.png" alt="WordPress" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">WordPress</p>
            </div>

            {/* Prestashop */}
            <div className="flex items-center">
              <img src="picture/presta.png" alt="Prestashop" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">Prestashop</p>
            </div>

            {/* PHP */}
            <div className="flex items-center">
              <img src="picture/php.png" alt="PHP" className="w-25 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">PHP</p>
            </div>

            {/* UEFN */}
            <div className="flex items-center">
              <img src="picture/uefn.png" alt="UEFN" className="w-16 h-16 mr-4" />
              <a
                href="https://www.fortnite.com/@arhoverse"
                target="_blank"
                rel="noreferrer"
                className="text-white text-3xl font-sans"
              >
                UEFN
              </a>
            </div>

            {/* Git */}
            <div className="flex items-center">
              <img src="picture/git.png" alt="Git" className="w-16 h-16 mr-4" />
              <a
                href="https://github.com/HenriMly"
                target="_blank"
                rel="noreferrer"
                className="text-white text-3xl font-sans"
              >
                Git
              </a>
            </div>

            {/* CCNA3 */}
            <div className="flex items-center">
              <img src="picture/ccna.png" alt="CCNA3" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">CCNA3</p>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Competences;
