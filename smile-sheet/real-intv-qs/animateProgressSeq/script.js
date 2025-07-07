// Problem:

// https://learnersbucket.com/examples/interview/animate-elements-in-a-sequence/



const root = document.getElementById("root");

let count = 0; // number of progress bars to be created

// Event handler for the "Add Progress Bar" button
function add() {
  count++;

  // Clicked first time (count === 1) : Need to invoke create() for creating progress bar
  // For next clicks: Previous create() itself handles invoking itself based on the count
  if (count === 1) {
    create();
  }
}

// Create a progress bar.
// n: time taken (in seconds) to complete the progress bar
function create(n = 2) {
  const ele = document.createElement("div");
  ele.classList.add("progressBar");
  ele.style = `transition: width ${n}s ease`;

  root.appendChild(ele);

  // To show the full width happening with transition effect, add the class some time after the DOM has been loaded
  setTimeout(() => {
    ele.classList.add("fullWidth");
  }, 50);

  // if current progress bar got completed
  ele.addEventListener("transitionend", () => {
    count--; // completed count-th progress bar, so only count-1 more progress bars left to be created

    // if more progress bars are required, create the next one
    if (count >= 1) {
      create();
    }
  });
}