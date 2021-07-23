import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { AuthService } from "../../services/authentication";


export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.maybe(types.string),
  })

  .extend(withEnvironment)
  .actions((self) => ({
    setAuthToken: (value: any) => {
      self.token = value;
    },
    clear: () => { },
  }))
  .actions((self) => ({
    userLogin: flow(function* (payload) {
      const authService: AuthService = new AuthService();

      const result = yield authService.userLogin(payload);

      if (result && result.kind === "ok") {
        if (result.data) {
          self.token = result.data.token;
        } else {
          console.log(result);
        }
      } else {
        console.log(result);
      }
      return result;
    }),
    register: flow(function* (payload) {
      const authService: AuthService = new AuthService();

      const result = yield authService.register(payload);

      if (result && result.kind === "ok") {
        if (result.data) {
          self.token = result.data.token;
        } else {
          console.log(result);
        }
      } else {
        console.log(result);
      }
      return result;
    }),
  }));

type AuthStoreType = Instance<typeof AuthStoreModel>;
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
