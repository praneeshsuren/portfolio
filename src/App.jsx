import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
// import Experiences from './sections/Experiences';

const App = () => {
  return (
    <>
      {/* Main container with max-width for most sections */}
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        <Hero />
        <About />
        {/* <Experiences /> */}
        <Projects />
      </div>

      {/* Contact section outside container for full-width particles */}
      <Contact />

      {/* Footer back in container */}
      <div className="container mx-auto max-w-7xl">
        <Footer />
      </div>
    </>
  );
};

export default App;
