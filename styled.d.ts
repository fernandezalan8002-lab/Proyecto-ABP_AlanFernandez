import "styled-components/native";
import { Tema } from "./constants/theme";

// Le indicamos a TypeScript la forma de nuestro tema, así
// `props.theme.colores.primario` queda tipado en todos los styled components.
declare module "styled-components/native" {
  export interface DefaultTheme extends Tema {}
}
