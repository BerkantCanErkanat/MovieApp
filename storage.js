class Storage{
    getListsAndIds(){
        let listsAndIds;
        if(localStorage.getItem("lists-ids") === null){
            listsAndIds = [];
        }else{
            listsAndIds = JSON.parse(localStorage.getItem("lists-ids"));
        }
        return listsAndIds;
    }
    deleteListandIds(index){
        let listsAndIds = this.getListsAndIds();
        listsAndIds.splice(index,1);
        localStorage.setItem("lists-ids",JSON.stringify(listsAndIds));
    }
    deleteIdFromThelist(listName,id){
        let index = this.getListNames().indexOf(listName);
        let listAndIds = this.getListsAndIds();
        listAndIds[index].ids.splice(listAndIds[index].ids.indexOf(id),1);
        localStorage.setItem("lists-ids",JSON.stringify(listAndIds));
    }
    addList(listName){
        let listsAndIds = this.getListsAndIds();
        listsAndIds.push({name:listName,ids:[]});
        localStorage.setItem("lists-ids",JSON.stringify(listsAndIds));
    }
    listNameDoesntExist(listName){
        let listsAndIds = this.getListsAndIds();
        let listNames = listsAndIds.map(listsAndIds => {
            return listsAndIds.name;
        });
        if(!listNames.includes(listName)){
            return true;
        }else{ // list name exists
           return false;
        }
    }
    getListNames(){
        let listsAndIds =this. getListsAndIds();
        return listsAndIds.map(listsAndIds => listsAndIds.name);
    }
    getIds(listName){
        let listsAndIds = this.getListsAndIds();
        return listsAndIds[this.getListNames().indexOf(listName)].ids;
    }
    addId(listName,id){ //string al
        let listsAndIds = this.getListsAndIds();
        listsAndIds.forEach(listandids => {
            if(listandids.name === listName){
                if(!listandids.ids.includes(id)){
                    listandids.ids.push(id);
                    localStorage.setItem("lists-ids",JSON.stringify(listsAndIds));
                }else{
                   //id zaten var
                }
            }
        })
    }
  
    
}