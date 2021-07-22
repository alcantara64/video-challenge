
import { AuthStoreModel } from "./../auth-store/auth-store";
import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { MovieStoreModel } from "../movie-store/movie-store";

// prettier-ignore
export const RootStoreModel = types
  .model("RootStore")
  .props({
    authStore: types.optional(AuthStoreModel, {}),
    moviesStore: types.optional(MovieStoreModel, {}),

  })
  .actions((self) => ({}));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
