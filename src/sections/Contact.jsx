import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

import EarthCanvas from "../components/EarthCanvas";
import { Particles } from "../components/Particles";

// Modal Component
const Modal = ({ isOpen, onClose, type, message }) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-gradient-to-b from-storm to-indigo rounded-2xl p-8 shadow-2xl border border-white/10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isSuccess
                  ? "bg-gradient-to-br from-mint to-aqua"
                  : "bg-gradient-to-br from-coral to-fuchsia"
                  }`}>
                  {isSuccess ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {isSuccess ? "Message Sent!" : "Oops!"}
              </h3>

              {/* Message */}
              <p className="text-neutral-300 text-center mb-6">
                {message}
              </p>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isSuccess
                  ? "bg-gradient-to-r from-aqua to-mint"
                  : "bg-gradient-to-r from-coral to-fuchsia"
                  }`}
              >
                {isSuccess ? "Great!" : "Try Again"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Praneesh Surendran",
          from_email: form.email,
          to_email: "praneeshsuren@gmail.com",
          message: form.message,
          time: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Colombo',
            dateStyle: 'full',
            timeStyle: 'long'
          }),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setModal({
            isOpen: true,
            type: "success",
            message: "Thank you for reaching out! I'll get back to you as soon as possible.",
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          setModal({
            isOpen: true,
            type: "error",
            message: "Something went wrong. Please try again or reach out directly via email.",
          });
        }
      );
  };

  return (
    <section id="contact" className="relative min-h-screen w-full mt-22 md:mt-20">
      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        message={modal.message}
      />

      {/* Stars Background - Full width */}
      <Particles
        className="absolute inset-0 w-full px-0 h-full z-0"
        quantity={150}
        staticity={30}
        ease={80}
        size={1}
        color="#ffffff"
      />

      {/* Content container with max-width and padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 py-10 sm:py-16">
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 items-center xl:items-start">
          {/* Contact Form */}
          <div className="flex-1 w-full max-w-xl">
            <p className="text-aqua uppercase tracking-wider text-sm font-medium mb-2">
              Get in touch
            </p>
            <h3 className="text-white font-bold text-4xl md:text-5xl mb-4">
              Contact<span className="text-aqua">.</span>
            </h3>
            <p className="text-neutral-400 mb-8">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2 text-sm">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-white/5 backdrop-blur-sm py-4 px-5 placeholder:text-neutral-500 text-white rounded-xl border border-white/10 focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 outline-none transition-all duration-300 font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2 text-sm">
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-white/5 backdrop-blur-sm py-4 px-5 placeholder:text-neutral-500 text-white rounded-xl border border-white/10 focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 outline-none transition-all duration-300 font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2 text-sm">
                  Your Message
                </span>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hi, I'd like to discuss..."
                  required
                  className="bg-white/5 backdrop-blur-sm py-4 px-5 placeholder:text-neutral-500 text-white rounded-xl border border-white/10 focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 outline-none transition-all duration-300 font-medium resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group relative py-4 px-8 rounded-xl w-full sm:w-fit text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {/* Button gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-aqua via-mint to-aqua bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* 3D Earth */}
          <div className="flex-1 w-full h-[350px] md:h-[500px] xl:h-[600px]">
            <EarthCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;