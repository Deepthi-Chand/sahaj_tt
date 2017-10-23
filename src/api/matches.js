// API Users static class
export default class ApiUsers {
  // get a list of users
  static getList() {
    return new Promise(resolve => {
      setTimeout(() => {
        // build some dummy users list
        let matches = [];
        for (let x = 1; x <= 28; x++) {
          matches.push({
            id: x,
            player1:"player1" + x,
            player2:"player2" + x,
            result: "scheduled"
          });
        }
        resolve(matches);
      }, 1000);
    });
  }

  // add/edit a user
  static addEdit() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 1000);
    });
  }

  // delete a user
  static delete() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 500);
    });
  }
}
