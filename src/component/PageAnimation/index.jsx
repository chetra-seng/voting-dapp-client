import React from "react";
import { motion } from "framer-motion";

const animation = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const PageAnimation = ({ children }) => {
  return (
    <motion.div
      variants={animation}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      transition={{duration: 0.6}}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimation;
