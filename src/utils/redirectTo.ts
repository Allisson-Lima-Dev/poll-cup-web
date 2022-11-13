import Router from "next/router";

export function redirectTo(destination: any, { res, status }: any = {}) {
  if (res) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else if (destination[0] === "/login" && destination[1] !== "/login") {
    Router.push(destination);
  } else {
    window.location = destination;
  }
}
