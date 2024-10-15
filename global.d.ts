//support module.scss
declare module "*module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  const SVG: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: "mobile" | "desktop";
declare const __ENV__: "development" | "production";
