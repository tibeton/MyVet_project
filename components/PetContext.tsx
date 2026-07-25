"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Only dog/cat drive the hero (video + health card). The "add pet" option in
// the switcher is a placeholder until auth exists, so it isn't a Pet here.
export type Pet = "dog" | "cat";

const PetContext = createContext<{
  pet: Pet;
  setPet: (p: Pet) => void;
} | null>(null);

export function PetProvider({ children }: { children: ReactNode }) {
  const [pet, setPet] = useState<Pet>("cat");
  return (
    <PetContext.Provider value={{ pet, setPet }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePet must be used within <PetProvider>");
  return ctx;
}
