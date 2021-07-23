
import { AxiosResponse } from "axios";


export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; data: null | string }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; data: null }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; data: null }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; data: null }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; data: null };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: AxiosResponse
): GeneralApiProblem | null {
  // ToastService.showError(response)

  // const { authStore } = useStores()

  switch (response.status) {
    case 500:
      return { kind: "server" };
    case 400:
      return { kind: "bad-data", data: response.data };
    case 401:
        return { kind: "unauthorized", data: response.data };

    case 403:
      return { kind: "forbidden", data: response.data };
    case 404:
      return { kind: "not-found", data: response.data };
    default:
      return { kind: "unknown", temporary: true };
  }
}

export function processErrorResponse(error: any): any {
  if (error.response) {
    return getGeneralApiProblem(error.response);
  } else if (error.request) {

    return {
      kind: "NetworkError",
      data: error.message,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("checkError", error.message);

    return {
      kind: "NetworkError",
      data: error.message,
    };
  }
}
