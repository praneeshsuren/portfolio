import { useState, useRef } from "react";
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
            className="relative text-lg font-medium text-neutral-400 hover:text-white transition-colors duration-200"
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

        if (latest > previous && latest > 50) {
            setIsScrolled(true);
            setIsOpen(false);
        } else if (latest < previous || latest <= 50) {
            setIsScrolled(false);
        }

        lastScrollY.current = latest;
    });

    const isCompact = isScrolled && !isOpen;
    const springConfig = { type: "spring", stiffness: 150, damping: 30, mass: 1 };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 flex-col items-center"
            >
                <motion.nav
                    layout
                    variants={{
                        compact: { width: "140px", padding: "0.75rem 1.5rem", borderRadius: "9999px" },
                        expanded: { width: "min(90vw, 800px)", padding: "0.75rem 2rem", borderRadius: "24px" },
                    }}
                    initial="expanded"
                    animate={isCompact ? "compact" : "expanded"}
                    transition={springConfig}
                    className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg shadow-black/10 overflow-hidden"
                    style={{ backdropFilter: "blur(12px)" }}
                >
                    <div className={`flex items-center w-full h-full ${isCompact ? 'justify-center' : 'justify-between'}`}>
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
                </motion.nav>
            </motion.div>

            {/* Mobile Hamburger Button Only */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden fixed top-4 right-4 z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg cursor-pointer"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-0.5 bg-white rounded-full block"
                />
                <motion.span
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-0.5 bg-white rounded-full block"
                />
                <motion.span
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-0.5 bg-white rounded-full block"
                />
            </motion.button>

            {/* Mobile Full-Screen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden fixed inset-0 z-40 backdrop-blur-xl bg-black/90 flex flex-col items-center justify-center gap-8"
                    >
                        <NavLink href="#home" onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink href="#about" onClick={() => setIsOpen(false)}>About</NavLink>
                        <NavLink href="#projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
                        <NavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
