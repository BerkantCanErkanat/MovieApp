//initializations
const api = new Api();
const ui = new UI();
const movie = new Movie();
const storage = new Storage();
const movieInput = document.getElementById("search_movie");
const searchButton = document.getElementById("search");
const movieGrid = document.getElementById("movie_grid");
const listAddingButtonAtModal = document.getElementById("newListaddingButton");
const listInput = document.getElementById("list-name");
const modalAlert = document.getElementById("modalAlert");
const listDropdown = document.getElementById("listDropdown");
addListeners();
/*filmler silme butonu ile gelsin 
liste yoksa filmlerin yanına tooltip at
fim zaten listede ekli ise alert ver ekli diye*/

function addListeners(){
    searchButton.addEventListener("click",searchMovies);
    listAddingButtonAtModal.addEventListener("click",listeEkleatModalClicked);
    listInput.addEventListener("keyup",listInputValueChanged);
    movieGrid.addEventListener("click",whichListToAddOrDelete);
    listDropdown.addEventListener("click",whichListToOpenOrDelete);
    document.getElementById("moviezz").addEventListener("click",() =>{
        api.getPopularMovies().then(response => {
            startScreen(response);
            ui.clearSearchInput();
        });
    });
    document.addEventListener("DOMContentLoaded",e => {
        ui.addListToNavbarDropdown(storage.getListNames());
        api.getPopularMovies().then(response => {
            startScreen(response);
        });
    })
    document.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
        }
    });
}
function whichListToOpenOrDelete(e){
    if(e.target.tagName === "A" && e.target.innerHTML != "create a list"){
        let ids = storage.getIds(e.target.innerHTML);
        ui.changeMainTitle(e.target.innerHTML);
        if(ids.length === 0){
            ui.noResultFound();
        }else{
         response = [];
         ids.forEach((id,index)=> {
             api.getMovieById(Number(id)).then(data => {
                 response.push(data);
                 if(index === ids.length - 1){ // async olay oldugundan bunu yapmak zorundaydım responsun dolması ıcın
                  //bunun baska cozumu ilk anda id degilde direkt responsu direkt tutmak olurdu cok daha efficient
                  movie.setIds(setInstantMovieIds(response));
                  movie.setTitles(setInstantMovieTitles(response));
                  ui.addMoviesToUI(response);
                  ui.insertDropdownAdjacentToButtons(storage.getListNames());  
                  ui.clearSearchInput();
                  ui.addADeleteButtonToMovies();
                 }
             });
         });
        }
    }else if(e.target.tagName === "BUTTON"){
        if(confirm(`Are you sure that you want to delete '${e.target.parentNode.firstChild.innerHTML}' permanently?`)){
            storage.deleteListandIds(storage.getListNames().indexOf(e.target.parentNode.firstChild.innerHTML));
            ui.addListToNavbarDropdown(storage.getListNames());
            ui.insertDropdownAdjacentToButtons(storage.getListNames());  
            ui.showToast("List And all the Ids deleted successfully");
        }
    }else if(e.target.tagName === "A" && e.target.innerHTML === "create a list"){
        ui.clearListInput();
        ui.badAlertText();
        ui.listAddingButtonDisabled();
    }  
}
function startScreen(response){
    movie.setIds(setInstantMovieIds(response));
    movie.setTitles(setInstantMovieTitles(response));
    ui.addMoviesToUI(response);
    ui.insertDropdownAdjacentToButtons(storage.getListNames());
    ui.changeMainTitle("Popular Movies");
}
function setInstantMovieTitles(response){
    let titles = response.map(movie =>{
        return movie.original_title;
    });
    return titles;
}
function setInstantMovieIds(response){
    let ids = response.map(movie =>{
        return movie.id;
    });
    return ids;
}
function whichListToAddOrDelete(e){
    if(e.target.tagName === 'A'){
       let listName = e.target.textContent;
       let movieTitle = e.target.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.innerHTML;
       let index = movie.titles.indexOf(movieTitle);
       if(index > -1){
        let movieId = movie.ids[index];
        storage.addId(listName,String(movieId));
        ui.showToast("New Movie added to the list successfully");
       }
    }else if(e.target.tagName === "BUTTON" && e.target.innerHTML === "Delete"){
        let title = e.target.parentNode.children[1].children[0].innerHTML;
        storage.deleteIdFromThelist(ui.getMainTitleName(),String(movie.ids[movie.titles.indexOf(title)]));
        ui.removeTheCardFromGrid(e.target.parentNode.parentNode);
        ui.showToast("Movie deleted from the list successfully");
    }
}
function listInputValueChanged(e){
    if(listInput.value.trim().length > 0 && storage.listNameDoesntExist(listInput.value.trim())){
        ui.listAddingButtonEnabled();
        ui.goodAlertText();
    }else{
        ui.badAlertText();
        ui.listAddingButtonDisabled();
    }
}
function listeEkleatModalClicked(e){
    storage.addList(listInput.value.trim());
    ui.addListToNavbarDropdown(storage.getListNames());
    ui.insertDropdownAdjacentToButtons(storage.getListNames());
    ui.showToast("New list created successfully");
}
function searchMovies(e){
    if(inputFieldCheck(movieInput)){
        ui.changeMainTitle(`Results With '${movieInput.value.trim()}'`);
        api.getMovies(movieInput.value.trim()).then(response =>{
            if(response.length === 0){
                ui.noResultFound();
            }else{
                movie.setIds(setInstantMovieIds(response));
                movie.setTitles(setInstantMovieTitles(response));
                ui.addMoviesToUI(response);
                ui.insertDropdownAdjacentToButtons(storage.getListNames());  
                ui.clearSearchInput();
            }
        });
    }
    e.preventDefault();
}
function inputFieldCheck(input){
   if(input.value.trim() === ""){
       ui.makeBlankInput(input);
       ui.changeMainTitle(``);
   }else{
    ui.makeTrueInput(input);
       return true;
   }
}