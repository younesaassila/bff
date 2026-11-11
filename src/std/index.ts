import type { BFF } from "../BFF.ts";
import { cell } from "./cell.ts";

export const stdlib = (bff: BFF) => ({ ...cell(bff) });
export type Stdlib = ReturnType<typeof stdlib>;
