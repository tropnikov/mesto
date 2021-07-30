export default class UserInfo {
  #profileName;
  #profileBio;

  constructor(userDataSelectors) {
    this.#profileName = document.querySelector(
      userDataSelectors.profileNameSelector
    );
    this.#profileBio = document.querySelector(
      userDataSelectors.profileBioSelector
    );
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      bio: this.#profileBio.textContent,
    };
  }

  setUserInfo(newUserData) {
    this.#profileName.textContent = newUserData.name;
    this.#profileBio.textContent = newUserData.bio;
  }
}
