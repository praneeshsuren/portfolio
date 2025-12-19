import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Animated orbital rings loader */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-aqua"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-mint"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-transparent border-t-white/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-aqua to-mint" />
          </motion.div>
        </div>

        {/* Progress text */}
        <div className="text-center">
          <motion.p
            className="text-white/90 text-sm font-medium tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading...
          </motion.p>
          <p className="text-aqua text-xs mt-1 font-mono">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
