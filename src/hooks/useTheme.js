import paletas from "../mocks/paletas.json";

export default function useTheme(type) {
  switch (type) {
    case "examples":
      return paletas.Examples;
    case "monochromaticPalettes":
      return paletas.monochromaticPalettes;
    case "websiteThemes":
      return paletas.websiteThemes;
  }
}
