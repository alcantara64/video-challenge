import { LocalAppUrl } from './../../helpers/api-config';
import { IMovie } from '../../core/models/movie-model';
import { HttpService } from './../http-service/index';

export class MovieService extends HttpService {
    getMovies(page: number) {
        return this.get(`/shows?page=${page}`);
    }
    getMovie(id: string) {
        return this.get(`/shows/${id}`);
    }
    search(query: string) {
        return this.get(`/search/shows?q=${query}`);
    }
    addToFavorite(token: string, payload: any) {
        return this.post(`${LocalAppUrl}/movie`, payload, {
            headers: {
                Authorization: `x-auth-token ${token}`
            }
        })
    }
    removeFromFavorite(token: string, id: string) {
        return this.delete(`${LocalAppUrl}/movie/${id}`, {
            headers: {
                Authorization: `x-auth-token ${token}`
            }
        })
    }


}