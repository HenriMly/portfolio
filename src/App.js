import Header from "./components/Header";
import Profil from "./components/Profil";
import Presentation from "./components/Presentation";
import Competences from "./components/Competences";
import Formation from "./components/formations";
import Experiences from "./components/Experiences";
import Coodonnees from "./components/Coordonnees";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Presentation />
      <Profil />
      <Competences />
      <Formation />
      <Experiences />
      <Coodonnees />
      <Footer />
      
    </div>
  );
}

export default App;
