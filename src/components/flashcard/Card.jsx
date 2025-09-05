import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "../../styles/components/flip_card.css";
import "../../styles/components/full_flip_card.css";

const Card = React.memo(function Card({ card, flipped, onFlip, variant }) {
  const frontContent = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {card.Q}
      </ReactMarkdown>
    ),
    [card.Q]
  );

  const backContent = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {card.A}
      </ReactMarkdown>
    ),
    [card.A]
  );

  return (
    <button
      className={`flip-card ${variant} ${flipped ? "flipped" : ""}`}
      type="button"
      onClick={onFlip}
      aria-pressed={flipped}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">{frontContent}</div>
        <div className="flip-card-back">{backContent}</div>
      </div>
    </button>
  );
});

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    Q: PropTypes.string,
    A: PropTypes.string,
  }).isRequired,
  flipped: PropTypes.bool.isRequired,
  onFlip: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "full"]),
};

Card.defaultProps = {
  variant: "default",
};

export default Card;
