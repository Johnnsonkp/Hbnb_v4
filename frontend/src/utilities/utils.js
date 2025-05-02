export function truncate(str, maxLength) {
  return str?.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export const dynamicImgSrc = (src) => {
  return window.location.port == 5173? `/images/${src}` : `/static/react/images/${src}` 
}