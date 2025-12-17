import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";

const NavLink = ({ href, children, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    // Check direction: if scrolling down AND past 50px, toggle compact
    if (latest > previous && latest > 50) {
      setIsScrolled(true);
      setIsOpen(false);
    } else if (latest < previous || latest <= 50) {
      // If scrolling up OR at top, expand (not compact)
      setIsScrolled(false);
    }

    lastScrollY.current = latest;
  });

  // Derived state: compact mode is active when scrolled and menu not open
  const isCompact = isScrolled && !isOpen;

  // Smoother, softer spring for liquid feel
  const springConfig = { type: "spring", stiffness: 150, damping: 22, mass: 1 };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
    >
      <motion.nav
        layout
        variants={{
          compact: { width: "140px", padding: "0.75rem 1.5rem", borderRadius: "9999px" },
          expanded: { width: "90vw", maxWidth: "800px", padding: "0.75rem 2rem", borderRadius: "24px" },
          mobileExpanded: { width: "90vw", maxWidth: "400px", padding: "1.5rem", borderRadius: "32px", height: "auto" }
        }}
        initial="expanded"
        animate={isOpen ? "mobileExpanded" : isCompact ? "compact" : "expanded"}
        transition={springConfig}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg shadow-black/10 overflow-hidden"
        style={{
          backdropFilter: "blur(12px)",
        }}
      >
        <div className={`flex items-center w-full h-full ${isCompact ? 'justify-center' : 'justify-between'}`}>
          {/* Logo */}
          <motion.a
            layout="position"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-bold text-white shrink-0 z-10"
          >
            Praneesh
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            <AnimatePresence mode="popLayout">
              {!isCompact && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-8"
                >
                  <NavLink href="#home">Home</NavLink>
                  <NavLink href="#about">About</NavLink>
                  <NavLink href="#projects">Projects</NavLink>
                  <NavLink href="#contact">Contact</NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            layout="position"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-10 cursor-pointer"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              className="w-6 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              className="w-6 h-0.5 bg-white rounded-full block"
            />
          </motion.button>
        </div>

        {/* Mobile Menu Content (Expandable) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden flex flex-col gap-4 mt-8 items-center w-full"
            >
              <NavLink href="#home" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink href="#about" onClick={() => setIsOpen(false)}>About</NavLink>
              <NavLink href="#projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
              <NavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
};

export default Navbar;
