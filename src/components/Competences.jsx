import React from "react";


const Competences = () => {
    return (
      <div className="flex justify-center items-start ">
      <div className="max-w-screen-md w-full ">
        <h1 id="competences" className="text-3xl font-bold text-center max-h-screen">Compétences</h1><br />
        <div className="border-4 bg-black border-black rounded-lg p-10 transition duration-300 hover:border-red-600">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center">
              <img src="picture/react-next.png" alt="Image 1" className="w-20 h-12 mr-4" />
              <a href="https://github.com/Arhoverse/E.S-Arques-tennis" target="_blank" className="text-white text-3xl font-serif">
                React.js/Next.js
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/JavaScript-logo.png" alt="Image 2" className="w-16 h-16 mr-4" />
              <a href="https://github.com/Arhoverse/Todolist-" target="_blank" className="text-white text-3xl font-serif">
                Javascript
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/226777_738cec596d.png" alt="Image 3" className="w-16 h-16 mr-4" />
              <a href="https://github.com/Arhoverse/BattleShip" target="_blank" className="text-white text-3xl font-serif">
                Java
              </a>
            </div>
            <div className="flex items-center">
              <img src="picture/c.png" alt="Image 4" className="w-14 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">
                C, C++, C#
              </p>
            </div>
            <div className="flex items-center">
              <img src="picture/python.jpg" alt="Image 5" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">
                Python
              </p>
            </div>
            <div className="flex items-center">
              <img src="picture/Html-css.png" alt="Image 6" className="w-20 h-16 mr-4" />
              <a href="https://github.com/Arhoverse/Todolist-" target="_blank" className="text-white text-3xl font-sans">
                Html/CSS
              </a>
            
            </div>
            <div className="flex items-center">
              <img src="picture/sql.png" alt="Image 6" className="w-20 h-10 mr-4" />
              <p className="text-white text-3xl font-sans">
                SQL
              </p>
            
            </div>
            <div className="flex items-center">
              <img src="picture/uefn.png" alt="Image 6" className="w-16 h-16 mr-4" />
              <a href="https://www.fortnite.com/@arhoverse" target="_blank" className="text-white text-3xl font-sans">
                UEFN
              </a>
            
            </div>
            <div className="flex items-center">
              <img src="picture/git.png" alt="Image 6" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">
                GIT
              </p>
            
            </div>
            <div className="flex items-center">
              <img src="picture/ccna.png" alt="Image 6" className="w-16 h-16 mr-4" />
              <p className="text-white text-3xl font-sans">
                CCNA2
              </p>
            
            </div>
          </div>
        </div>
        <br /><br />
      </div>
    </div>

    );
  }
  
  export default Competences;