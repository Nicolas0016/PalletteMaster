import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
const CodeBlock = ({ codeString, language }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        toast.success("Copied without errors");
      })
      .catch((err) => {
        toast.error("Failed to copy text");
        console.error("Error copying text: ", err);
      });
  };

  return (
    <div className="relative">
      <button
        className="absolute right-5 top-5 bg-blue-500 text-white border-none rounded-md px-2 py-1 cursor-pointer"
        onClick={handleCopy}
      >
        Copy
      </button>
      <div className="p-7">
        <SyntaxHighlighter language={language} style={a11yDark}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

CodeBlock.propTypes = {
  codeString: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
export default CodeBlock;
