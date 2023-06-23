import http from "../http-commons.js";

class TutorialService {

  findAllTutorials() {

    return http.get(``);
  }

  findTutorialById(id) {
    
    return http.get(`/tutorial-id/${id}`);

  }

  saveTutorial(tutorial) {

    console.log(tutorial);

    return http.post(``, tutorial);
  }

  updateTutorial(tutorial) {
    
    return http.put(``, tutorial);
  }

  removeTutorial(id) {

    return http.delete(`/tutorial-id/${id}`);
    
  }

}

export default new TutorialService();
