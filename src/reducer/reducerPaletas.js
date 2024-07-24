export default function reducerPaletas(state, action) {
  switch (action.type) {
    case "addPallette":
      return [...state, action.payload];
    case "removePallete":
      return state.filter((pallete) => pallete != action.payload);
    default:
      return state;
  }
}
