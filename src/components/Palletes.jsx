import { useState } from "react";
import { Link } from "react-router-dom";
export default function Palettes({ pallettes }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <ul className="flex flex-wrap mx-auto">
      {pallettes.map((paleta) => (
        <li title={paleta.name} key={paleta.name} className="m-2">
          <section className="rounded-lg">
            <ul className="flex">
              {paleta.colors.map((color) => (
                <li
                  key={color.id}
                  style={{ background: color.color }}
                  onMouseOver={() => setHoveredIndex(color.id)}
                  onMouseOut={() => setHoveredIndex(null)}
                  className={`flex justify-center items-center transition-all duration-300 ${
                    color.id === hoveredIndex ? "h-20 w-20 z-10" : "h-20 w-14"
                  } ${
                    color.id === paleta.colors[0].id
                      ? "rounded-tl-lg rounded-bl-lg"
                      : ""
                  } ${
                    color.id === paleta.colors[paleta.colors.length - 1].id
                      ? "rounded-tr-lg rounded-br-lg"
                      : ""
                  }`}
                >
                  {color.id === hoveredIndex && (
                    <span
                      className="text-white font-bold text-xs"
                      style={{ backgroundColor: color.color }}
                    >
                      {color.color}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to={`/pallette/${paleta.name.split(" ").join("")}`}
              className="block mt-4 font-medium text-black dark:text-white"
            >
              Ver plantilla
            </Link>
          </section>
        </li>
      ))}
    </ul>
  );
}
