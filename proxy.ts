import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Aplica o middleware a todas as rotas exceto arquivos estáticos e API
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
