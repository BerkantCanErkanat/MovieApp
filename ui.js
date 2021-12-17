class UI{
    constructor(){
        this.grid = document.getElementById("movie_grid");
        this.listDropdown = document.getElementById("listDropdown");
        this.modalAlert = document.getElementById("modalAlert");
        this.listAddingButtonAtModal = document.getElementById("newListaddingButton");
        this.listInput = document.getElementById("list-name");
        this.mainTitle = document.getElementById("main-title");
        this.searchInput = document.getElementById("search_movie");
        this.toastBody = document.getElementById("toastContent");
        this.toast = new bootstrap.Toast(document.getElementById('liveToast'));
    }
    addMoviesToUI(movies){
        this.grid.innerHTML = "";
        movies.forEach(movie =>{
          let imagePath;
            if(movie.backdrop_path === null){
              imagePath = "https://cdn1.ntv.com.tr/gorsel/Kma2XCewEUKRcTeh7ibWeQ.jpg?width=1000&mode=both&scale=both&v=1610275420807"
            }else{
              imagePath = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            }
            this.grid.innerHTML += `
            <div class="col mb-4" >
            <div class="card" id="card">
              <img src=${imagePath} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
                <div class="dropdown" id="cardDropdown">
                  <button class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Add to List
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="DropdownAdjButton">
                  </ul>
                </div>
              </div>
            </div>
     </div>
            `
        })
    }
    insertDropdownAdjacentToButtons(listNames){
      if(listNames.length === 0){
        document.querySelectorAll("#DropdownAdjButton").forEach(ul => { 
          ul.innerHTML = "No list created";
        })
      }else{
        document.querySelectorAll("#DropdownAdjButton").forEach(ul => { 
          ul.innerHTML = "";
          listNames.forEach(listName => {
            ul.innerHTML += `<li><a class="dropdown-item" href="#">${listName}</a></li>`
          })
        });
      }
    }
    // <li><a class="dropdown-item" href="#">Action</a></li>
    makeBlankInput(input){
      input.value = "";
      input.placeholder = "do not leave me blank";
      input.style.outline = "2px solid red";
      this.grid.innerHTML = "";
    }
    makeTrueInput(input){
      input.placeholder = "Harry Potter...";
      input.style.outline = "none";
    }
    noResultFound(){
      this.grid.innerHTML = "";
      this.grid.innerHTML = `<img src="https://www.clipartmax.com/png/middle/153-1533013_sorry-no-results-found.png" class="img-fluid" alt="Responsive image">`;
    }
    addListToNavbarDropdown(listNames){
      this.listDropdown.innerHTML = `<li>
      <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" type="button" href="#" data-bs-toggle="modal"
        data-bs-target="#exampleModal" data-bs-whatever="@mdo" id="createListButton">create a list</a></li>`;
      listNames.forEach(listName => {
        let firstChild = this.listDropdown.firstChild;

        let newList = document.createElement("li");
        newList.className = "d-flex justify-content-between";
        newList.innerHTML = `<a class="dropdown-item" href="#">${listName}</a>`;
        newList.innerHTML += `<button type="button" class="btn-close align-self-center" aria-label="Close" id="deletList"></button>`;
        this.listDropdown.insertBefore(newList,firstChild);
      })
    }
    badAlertText(){
      this.modalAlert.style.color = "#FF0000";
      this.modalAlert.textContent = "List name already exists or no input";
    }
    listAddingButtonEnabled(){
     this.listAddingButtonAtModal.removeAttribute("disabled");
    }
    listAddingButtonDisabled(){
      this.listAddingButtonAtModal.setAttribute("disabled",true);
    }
    clearListInput(){
      this.listInput.value = "";
    }
    goodAlertText(){
      this.modalAlert.style.color = "#008000";
      this.modalAlert.textContent = "Good Choice!";
    }
    changeMainTitle(title){
      this.mainTitle.innerHTML = title;
    }
    clearSearchInput(){
      this.searchInput.value = "";
    }
    addADeleteButtonToMovies(){
      document.querySelectorAll("#card").forEach(card => {
        card.innerHTML += `<button type="button" class="btn btn-danger">Delete</button>`
      });
    }
    getMainTitleName(){
      return this.mainTitle.innerHTML;
    }
    removeTheCardFromGrid(child){
      this.grid.removeChild(child);
    }
    showToast(content){
      this.toastBody.innerHTML = content;
      this.toast.show();
    }
}