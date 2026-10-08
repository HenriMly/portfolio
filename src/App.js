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
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* lg:pl-52 laisse la place au menu latéral fixe (w-44) */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:pl-52 lg:pr-8">
        <div className="mx-auto max-w-3xl space-y-12 sm:space-y-16">
          <Presentation />
          <Profil />
          <Competences />
          <Formation />
          <Experiences />
          <Coodonnees />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
