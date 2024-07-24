import useAppContext from "../hooks/useAppContext";
import Palettes from "./Palletes";
export default function SectionPaletas() {
  const { state } = useAppContext();
  return (
    <ul>
      {state.map((category, index) => (
        <li key={index}>
          <h4 className="dark:text-white text-gray-900 text-3xl font-semibold">
            {category.type}
          </h4>
          <Palettes pallettes={category.items} />
        </li>
      ))}
    </ul>
  );
}
/*

      */
