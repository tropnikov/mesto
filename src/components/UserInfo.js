export default class UserInfo {
  #profileName;
  #profileBio;
  #profileAvatar;
  #avatar;
  #id;

  constructor(userDataSelectors) {
    this.#profileName = document.querySelector(
      userDataSelectors.profileNameSelector
    );
    this.#profileBio = document.querySelector(
      userDataSelectors.profileBioSelector
    );
    this.#profileAvatar = document.querySelector(
      userDataSelectors.profileAvatarSelector
    );
    // this.#avatar =
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      bio: this.#profileBio.textContent,
      avatar: this.#avatar,
      id: this.#id,
    };
  }

  setUserInfo(newUserData) {
    this.#profileName.textContent = newUserData.name;
    this.#profileBio.textContent = newUserData.about;
    this.#profileAvatar.style.backgroundImage =
      'url(' + `${newUserData.avatar}` + ')';
    console.log(newUserData.avatar);
    // this.#id = newUserData.id;
    // console.log(newUserData.id);
    // console.log(this.#id);
  }
}
