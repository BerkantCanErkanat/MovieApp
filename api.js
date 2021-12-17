class Api{
    constructor(){
        this.API_KEY = '23ded31c24a4d9912afc40b57f8d2efb';
    }
    async getMovies(name){
        //film requesti yap
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${name}`);
        const data = await response.json();
        return data.results;
    }
    async getPopularMovies(){
        let page = Math.floor(Math.random() * 100) + 1;
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        return data.results;
    }
    async getMovieById(id){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}`);
        const data = await response.json();
        return data;
    }
}
