
import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";

import { withRootStore } from "../extensions/with-root-store";
import { MovieService } from "../../services/movies";

const MovieModel = types.model("MovieModel").props({
    id: types.string,
    name: types.maybe(types.string),
    url: types.maybe(types.string),
    season: types.maybe(types.number),
    number: types.maybe(types.number),
    type: types.maybe(types.string),
    airdate: types.maybe(types.string),
    airtime: types.maybe(types.string),
    summary: types.maybeNull(types.string),
    _links: types.maybe(types.string),
    embed: types.frozen(),
});

export const MovieStoreModel = types
    .model("MovieStore")
    .props({
        movies: types.optional(types.array(MovieModel), []),
    })

    .extend(withEnvironment)
    .extend(withRootStore)

    .actions((self) => ({
        setPayers: (value: any) => {
            self.movies.replace(value);
        },
        clear: () => { },
    }))
    .actions((self) => ({
        getPayer: flow(function* () {

            const payerService = new MovieService();

            const result = yield payerService.getMovies();

            if (result && result.kind === "ok") {
                if (result.data) {
                    self.setPayers(result.data);
                } else {
                    console.log(result);
                }
            } else {
                console.log(result);
            }
            return result;
        })
    }));

type PayerStoreType = Instance<typeof MovieStoreModel>;
export interface PayerStore extends PayerStoreType { }
type PayerStoreSnapshotType = SnapshotOut<typeof MovieStoreModel>;
export interface PayerStoreSnapshot extends PayerStoreSnapshotType { }
