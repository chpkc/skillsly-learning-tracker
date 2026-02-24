import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function SplashScreen() {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 gap-4"
    >
      <div className="relative flex flex-col items-center">
        {/* Book Icon animating from behind/below upwards */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: -45, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.8, 
            ease: "backOut", // slight bounce effect at the end
            delay: 0.3 
          }}
          className="absolute z-0 text-blue-500"
        >
          <BookOpen className="size-12 sm:size-16" strokeWidth={1.5} />
        </motion.div>

        {/* Logo Text - stays in front */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl z-10 bg-neutral-950 px-4 py-2"
        >
          skillsly
        </motion.div>
      </div>
    </motion.div>
  );
}
