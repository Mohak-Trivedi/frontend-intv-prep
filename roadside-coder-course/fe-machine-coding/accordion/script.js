const sections = [
  {
    title: "Section 1",
    content: "Content for Section 1",
  },
  {
    title: "Section 2",
    content: "Content for Section 2",
  },
  {
    title: "Section 3",
    content: "Content for Section 3",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const accordionContainer = document.querySelector("#accordion");

  sections.forEach((section, index) => {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("accordion-item");

    const sectionHeader = document.createElement("div");
    sectionHeader.classList.add("accordion-header");
    sectionHeader.textContent = section.title;

    const sectionContent = document.createElement("div");
    sectionContent.classList.add("accordion-content");
    sectionContent.innerHTML = `<p>${section.content}</p>`;

    sectionItem.appendChild(sectionHeader);
    sectionItem.appendChild(sectionContent);
    accordionContainer.appendChild(sectionItem);

    if (index === 0) {
      sectionContent.style.display = "block";
    } else {
      sectionContent.style.display = "none";
    }
  });

  accordionContainer.addEventListener("click", function (event) {
    const header = event.target.closest(".accordion-header");
    console.log(header);

    if (!header) return; // we may get null in case the click was in accordionContainer,
    // but not on any accordion header.

    // const sectionItem = header.parentNode;
    // const content = sectionItem.querySelector(".accordion-content");
    // const isActive = sectionItem.classList.contains("active");

    document.querySelectorAll(".accordion-item").forEach((item) => {
      //   item.classList.remove("active");
      item.querySelector(".accordion-content").style.display = "none";
    });

    const sectionItem = header.parentNode;
    const content = sectionItem.querySelector(".accordion-content");

    // sectionItem.classList.add("active");
    content.style.display = "block";
  });
});
