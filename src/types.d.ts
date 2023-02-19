declare module '*.css' {
  const css: { [key: string]: string };
  export default css;
}

declare module '*.svg' {
  const svg: string;
  export default svg;
}
