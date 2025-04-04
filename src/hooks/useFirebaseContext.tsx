import { useContext } from "react";
import { FirebaseContext } from "@/providers/FirebaseProvider";

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseContext must be used within a Firebase Provider"
    );
  }
  return context;
};
