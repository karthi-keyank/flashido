import { useState } from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import "../../styles/components/CardInput.css";

function CardInput({ index, term, definition, updateCard, deleteCard }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="card-input">
      {/* Header buttons */}
      <div className="card-input__header">
        <button
          className="card-input-toggle-btn"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
        <button
          className="card-input-delete-btn"
          onClick={() => deleteCard(index)}
        >
          <FaTrash />
        </button>
      </div>

      {/* Preview Mode */}
      {showPreview ? (
        <div className="markdown-preview">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {`**${term}**\n\n${definition}`}
          </ReactMarkdown>
        </div>
      ) : (
        // Edit Mode
        <>
          <input
            type="text"
            className="card-input-term"
            placeholder="TERM (Markdown + LaTeX supported)"
            value={term}
            onChange={(e) => updateCard(index, "term", e.target.value)}
          />
          <textarea
            className="card-input-definition"
            placeholder="DEFINITION (Markdown + LaTeX supported)"
            value={definition}
            onChange={(e) => updateCard(index, "definition", e.target.value)}
            rows={3}
          />
        </>
      )}
    </div>
  );
}

CardInput.propTypes = {
  index: PropTypes.number.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  updateCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default CardInput;
