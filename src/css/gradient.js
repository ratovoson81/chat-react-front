import classNames from "classnames";

export const post = classNames(
  "bg-gradient-to-br",
  "from-yellow-400 ",
  "to-red-800 ",
  "rotate-6"
);

export const album = classNames(
  "bg-gradient-to-br",
  "from-pink-400",
  "to-purple-800",
  "-rotate-6"
);

export const secondPost = classNames("-rotate-3");
export const secondAlbum = classNames("-rotate-0");

export function gradient(path) {
  if (path === "/register") {
    return post;
  }
  if (path === "/") {
    return album;
  }
}

export function gradientGray(path) {
  if (path === "/register") {
    return secondPost;
  }
  if (path === "/") {
    return secondAlbum;
  }
}
