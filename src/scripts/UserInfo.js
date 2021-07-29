export default class UserInfo {
  #userDataSelectors;

  constructor(userDataSelectors) {
    this.#userDataSelectors = userDataSelectors;
  }

  getUserInfo() {
    return {
      name: this.#userDataSelectors.profileNameSelector.textContent,
      bio: this.#userDataSelectors.profileBioSelector.textContent,
    };
  }

  setUserInfo(newUserData) {
    this.#userDataSelectors.profileNameSelector.textContent = newUserData.name;
    this.#userDataSelectors.profileBioSelector.textContent = newUserData.bio;
  }
}
