import { useState } from "react";
import { useParams } from "react-router-dom";
import CodeBlock from "../components/Code";
import useAppContext from "../hooks/useAppContext";

export default function Pallette() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { palletteName } = useParams();
  const { state } = useAppContext();
  const [codeType, setCodeType] = useState("");

  const pallette = state
    .flatMap((theme) => theme.items)
    .find((item) => item.name.split(" ").join("") === palletteName);

  if (!pallette) return <p>Pallette not found</p>;

  const cssCode = pallette.colors
    .map((color, index) => `.color${index + 1} { color: ${color.color}; }`)
    .join("\n");

  const htmlCode = pallette.colors
    .map(
      (color, index) =>
        `<div class="text-[${color.color}]">color${index + 1}</div>`
    )
    .join("\n");

  const handleGenerateCode = (type) => {
    if (codeType === type) setCodeType("");
    else {
      setCodeType(type);
    }
  };

  return (
    <section className="flex flex-col items-center gap-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl dark:text-white font-semibold">
        {pallette.name}
      </h1>
      <div className="dark:bg-black/20 rounded-lg w-full max-w-4xl">
        <ul className="flex flex-wrap justify-center">
          {pallette.colors.map((color) => (
            <li
              key={color.id}
              style={{ background: color.color }}
              onMouseOver={() => setHoveredIndex(color.id)}
              onMouseOut={() => setHoveredIndex(null)}
              className={`flex justify-center items-center transition-all duration-300 m-1 ${
                color.id === hoveredIndex
                  ? "h-32 w-20 z-10 sm:h-96 sm:w-44"
                  : "h-32 w-16 sm:h-96 sm:w-32"
              } ${
                color.id === pallette.colors[0].id
                  ? "rounded-tl-lg rounded-bl-lg"
                  : ""
              } ${
                color.id === pallette.colors[pallette.colors.length - 1].id
                  ? "rounded-tr-lg rounded-br-lg"
                  : ""
              }`}
            >
              {color.id === hoveredIndex && (
                <span
                  className="text-white font-bold text-sm sm:text-lg"
                  style={{ backgroundColor: color.color }}
                >
                  {color.color}
                </span>
              )}
            </li>
          ))}
        </ul>
        <footer className="py-4 px-2 flex flex-col sm:flex-row justify-between text-white/60 gap-3">
          <ul className="flex gap-3 sm:gap-5">
            <li>
              <button
                onClick={() => handleGenerateCode("css")}
                className={`border border-white/60 hover:border-white hover:text-white rounded-lg px-2 py-1 ${
                  codeType === "css" ? "border-white text-white" : ""
                }`}
              >
                Generar CSS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleGenerateCode("html")}
                className={`border border-white/60 hover:border-white hover:text-white rounded-lg px-2 py-1 ${
                  codeType === "html" ? "border-white text-white" : ""
                }`}
              >
                Generar HTML
              </button>
            </li>
          </ul>
          <button className="border border-white/60 hover:border-white hover:text-white rounded-lg px-2 py-1">
            Favoritos
          </button>
        </footer>
      </div>
      {codeType && (
        <CodeBlock
          language={codeType}
          codeString={codeType === "css" ? cssCode : htmlCode}
        />
      )}
    </section>
  );
}
