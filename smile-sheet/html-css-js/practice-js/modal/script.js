// https://www.youtube.com/watch?v=TAB_v6yBXIE

const modal = document.querySelector("#modal");
const openModalBtn = document.querySelector(".open-button");
const closeModalBtn = document.querySelector(".close-button");

openModalBtn.addEventListener("click", () => {
  modal.showModal();
})

closeModalBtn.addEventListener("click", () => {
  modal.close();
});