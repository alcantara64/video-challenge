import { IMovie } from '../../core/models/movie-model';
import { HttpService } from './../http-service/index';

export class MovieService extends HttpService {
    getMovies() {
        return this.get('/schedule/full');
    }
    search(query: string) {
        return this.get(`/search/shows?q=${query}`);
    }

}