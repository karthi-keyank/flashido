import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const CardVertical = React.memo(function Card({ card }) {
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
    <div className="vertical-card">
      <div className="vertical-card-front">
        <h3>Question</h3>
        {frontContent}
      </div>
      <div className="vertical-card-back">
        <h3>Answer</h3>
        {backContent}
      </div>
    </div>
  );
});

CardVertical.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    Q: PropTypes.string,
    A: PropTypes.string,
  }).isRequired,
};

export default CardVertical;
