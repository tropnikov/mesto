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
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      about: this.#profileBio.textContent,
      // avatar: this.#profileAvatar.style.backgroundImage,
    };
  }

  setUserInfo(newUserData) {
    if (newUserData.name) {
      this.#profileName.textContent = newUserData.name;
    }
    if (newUserData.about) {
      this.#profileBio.textContent = newUserData.about;
    }
  }

  setAvatar(data) {
    if (data.avatar) {
      this.#profileAvatar.style.backgroundImage =
        'url(' + `${data.avatar}` + ')';
    }
  }
}
