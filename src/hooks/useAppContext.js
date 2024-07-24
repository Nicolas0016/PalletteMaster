import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function useAppContext() {
  const context = useContext(AppContext);
  if (context == null)
    throw new Error("Tienes que usar el contexto dentro de provider");
  return context;
}
