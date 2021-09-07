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
      bio: this.#profileBio.textContent,
      avatar: this.#profileAvatar.style.backgroundImage,
    };
  }

  setUserInfo(newUserData) {
    this.#profileName.textContent = newUserData.name;
    this.#profileBio.textContent = newUserData.bio;
  }

  setAvatar(data) {
    this.#profileAvatar.style.backgroundImage = 'url(' + `${data.avatar}` + ')';
  }
}
