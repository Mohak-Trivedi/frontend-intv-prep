const tabsData = [
  {
    id: "tab1",
    title: "Tab 1",
    content: "This is a content for Tab 1",
  },
  {
    id: "tab2",
    title: "Tab 2",
    content: "This is a content for Tab 2",
  },
  {
    id: "tab3",
    title: "Tab 3",
    content: "This is a content for Tab 3",
  },
  // Add more objects as per need
];

document.addEventListener("DOMContentLoaded", function () {
  let activeTab = tabsData[0].id; // By default, keeping 0th tab as default active

  function renderTabs() {
    const tabContainer = document.querySelector("#tabsContainer");
    const contentContainer = document.querySelector("#tabContentContainer");

    tabsData.forEach((tab) => {
      const tabButton = document.createElement("button");
      tabButton.textContent = tab.title;
      tabButton.className = "tabLinks";
      tabButton.setAttribute("data-tab", tab.id);
      tabContainer.appendChild(tabButton);

      const tabContent = document.createElement("div");
      tabContent.innerHTML = `
        <h3>${tab.title}</h3>
        <p>${tab.content}</p>
        `;
      tabContent.id = tab.id;
      tabContent.className = "tabContents";
      contentContainer.appendChild(tabContent);
    });

    // Optimization by using Event Delegation by adding event listener on parent
    // i.e. tabContainer instead of on actual target i.e. tabButton.tabLinks
    tabContainer.addEventListener("click", function (event) {
      if (event.target.matches(".tabLinks")) {
        // extract id to understand tab content to be rendered
        const tabId = event.target.getAttribute("data-tab");

        // update only if not already an active tab
        if (tabId != activeTab) {
          openTab(tabId);
          activeTab = tabId;
        }
      }
    });
  }

  function openTab(tabId) {
    const tabContents = document.querySelectorAll(".tabContents");
    const tabLinks = document.querySelectorAll(".tabLinks");

    tabContents.forEach((tab) => tab.classList.remove("active"));
    tabLinks.forEach((tab) => tab.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    document
      .querySelector(`button[data-tab="${tabId}"]`)
      .classList.add("active");
  }

  renderTabs();
  document.getElementById(activeTab).classList.add("active");
  document
    .querySelector(`button[data-tab="${activeTab}"]`)
    .classList.add("active");
});
