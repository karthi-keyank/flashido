import { motion } from "framer-motion";
import PropTypes from "prop-types";

function PageWrapper({ children }) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.20, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
