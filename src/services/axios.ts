/* eslint-disable no-useless-computed-key */
import axios, { AxiosError } from "axios";
import router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
// import { signOut } from '~/context/AuthContext';
import { AuthTokenError } from "~/error/AuthTokenError";
// import { UnauthorizedError } from "~/error/UnauthorizedError";

interface FailedRequestQueue {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
}
const signOut = () => {
  destroyCookie(null, "@PollCupAccess_token", { path: "/" });
  destroyCookie(null, "@PollCupRefresh_token", { path: "/" });
  destroyCookie(null, "@two-factor", { path: "/" });
  router.push("/");
};

export function getAPIClient(ctx?: any) {
  const { "@PollCupAccess_token": access, "@PollCupRefresh_token": refresh } =
    parseCookies(ctx);

  let isRefreshing = false;

  let failedRequestsQueue: Array<FailedRequestQueue> = [];

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  // 🚀 INTERCEPTOR DOS DADOS VINDOS DA API 🚀
  api.interceptors.response.use(
    (response) => {
      // Se ocorrer tudo certo.
      return response;
    },

    (error) => {
      // Guarda a requisição que deu erro
      const originalRequest = error.config;

      // 400 - Bad Request
      // if (error.response.status === 400 || error.response.status === 401) {
      //   // Verifica se é token invalido, se for faz refresh
      //   if (error.response.data.code === "token_not_valid") {
      //     if (!isRefreshing) {
      //       isRefreshing = true;

      //       return api
      //         .post(
      //           `/identity_server/oauth/tokens/${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      //           { refresh }
      //         ) // -> refresh token 🚀
      //         .then((res) => {
      //           setCookie(null, "@PollCupAccess_token", res.data.access, {
      //             maxAge: 60 * 60 * 1, // 1hour
      //             path: "/",
      //           });
      //           failedRequestsQueue.forEach((request) =>
      //             request.onSuccess(res.data.access)
      //           );
      //           failedRequestsQueue = [];
      //         })
      //         .catch((err) => {
      //           failedRequestsQueue.forEach((request) =>
      //             request.onFailure(err)
      //           );
      //           failedRequestsQueue = [];
      //           signOut();
      //           process.browser
      //             ? signOut() // logout user signOut()
      //             : Promise.reject(new AuthTokenError());
      //         })
      //         .finally(() => {
      //           isRefreshing = false;
      //         });
      //     }
      //     // Adiciona requisições a fila para assim que for realizado o refresh
      //     // elas serem chamadas.
      //     return new Promise((resolve, reject) => {
      //       failedRequestsQueue.push({
      //         onSuccess: (token) => {
      //           originalRequest.headers.Authorization = `Bearer ${token}`;
      //           resolve(api(originalRequest));
      //         },
      //         onFailure: (err) => {
      //           reject(err);
      //         },
      //       });
      //     });
      //   }
      // }

      // // 400 - Bad Request
      // if (error.response.status === 400) {
      //   clearLocalStorage();
      //   signOut();
      //   // process.browser ? signOut() : Promise.reject(error);
      //   return Promise.reject(error);
      // }
      if (error.response.status === 401) {
        signOut();
        return Promise.reject(error);
      }

      // Error Request
      if ([401, 402].includes(error.response.status)) {
        process.browser
          ? signOut() // logout user signOut()
          : Promise.reject(new AuthTokenError());
      }

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    return config;
  });

  if (access) {
    api.defaults.headers.common.Authorization = `Bearer ${access}`;
  }

  return api;
}
