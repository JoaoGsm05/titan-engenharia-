export interface ServiceGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string; // nome do SVG em public/assets/icons/
}

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  type: string;
  image: string; // caminho relativo a public/
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormState {
  status: "idle" | "sending" | "success" | "error";
  message?: string;
}

export type Locale = "pt" | "en";
