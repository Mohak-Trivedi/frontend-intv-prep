// Event Propagation in JavaScript
// Question - What is Event Propagation?
// For our HTML:
/*
<body>
    <div>
        DIV
        <form action="">
            FORM
            <button>
                BUTTON
            </button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
*/
/*
Now, if we have click event listeners on div, form and button.
And, if we click on the button, all the 3 events will get triggered because the
button is present in the form which is present in the div. 
Hence, the 3 events will get triggered one by one:
By default from innermost to outermost: button to div.
But, we can also manipulate this.
Hence, the event "propagates" and this phenomenon is called as Event Propagation.
*/


// Question - What is Event Bubbling?
// Bubbles always go from bottom to top.
// So, in event bubbling, the events are propagated from bottom (innermost) to
// top (outermost).
// In case of our previous question e.g.:
// The button's click will get triggered first, then form and then div.
// EXCEPTION:
// Any events specific to one element do not bubble: focus, blur, load, unload, change, 
// reset, scroll, most of the DOM events (DOMFocusIn, DOMFocusOut, DOMNodeRemoved, etc), 
// mouseenter, mouseleave, etc
// const div = document.querySelector('div');
// const form = document.querySelector('form');
// const button = document.querySelector('button');

// div.addEventListener('click', () => {
//     alert('div');
// });
// form.addEventListener('click', () => {
//     alert('form');
// });
// button.addEventListener('click', () => {
//     alert('button');
// });

// Question - event.target v/s this.target v/s event.currentTarget
// Answer:
// Events bubble by default. So the difference between the three is:
// target is the element that triggered the event (e.g., the user clicked on)
// currentTarget is the element that the event listener is attached to.
// this is similar to currentTarget
// const div = document.querySelector('div');
// const form = document.querySelector('form');
// const button = document.querySelector('button');

// div.addEventListener('click', func);
// form.addEventListener('click', func);
// button.addEventListener('click', func);

// function func(event) {
//     alert("currentTarget = " + event.currentTarget.tagName + 
//         ", target = " + event.target.tagName + 
//         ", this = " + this.tagName
//     );
// }


// Question - What is Event Capturing / Trickling?
// Answer:
// By default, events get bubbled i.e. propagate from bottom to top.
// With Event Capturing, we can make them propagate from top to bottom.
// const div = document.querySelector('div');
// const form = document.querySelector('form');
// const button = document.querySelector('button');

// div.addEventListener('click', function () {
//     alert('div');
// },
// {
//     capture: true,
// });

// form.addEventListener('click', function () {
//     alert('form');
// },
// {
//     capture: true,
// });

// button.addEventListener('click', function () {
//     alert('button');
// },
// {
//     capture: true,
// });
// Suppose if we remove { capture: true } from the event listeners of form and 
// button, then upon clicking the button, first the event listener of div will
// get called as it has capture: true, but then later on instead of coming top
// to bottom i.e. instead of form then button, we go bottom to top i.e. button to
// form.


// Question - How to stop bubbling or capturing?
// Answer:
// By using event.stopPropagation() in the event from where you don't want to 
// propagate (bubble or capture) further.
// const div = document.querySelector('div');
// const form = document.querySelector('form');
// const button = document.querySelector('button');

// div.addEventListener('click', function (e) {
//     e.stopPropagation();
//     alert('div');
// });

// form.addEventListener('click', function (e) {
//     e.stopPropagation();
//     alert('form');
// });

// button.addEventListener('click', function (e) {
//     e.stopPropagation();
//     alert('button');
// });
// Suppose we want to allow bubbling from button to form, but not further,
// then remove e.stopPrapagation() from button's event listener, but let it be
// in event listeners of form and further elements.


// Question - What if upon clicking the button, we want to first execute the 
// event listener of form, then the button and then the div? 
// So, this is neither pure bubbling nor pure capturing. How to do it?
// Answer:
// Capture the event triggered at button in the event listener of form, then we
// follow normal bubbling i.e. bottom to top i.e. button and then div.
// const div = document.querySelector('div');
// const form = document.querySelector('form');
// const button = document.querySelector('button');

// div.addEventListener('click', function () {
//     alert('div');
// });

// form.addEventListener('click', function () {
//     alert('form');
// },
// {
//     capture: true,
// });

// button.addEventListener('click', function () {
//     alert('button');
// });


// Question - What is Event Delegation?
// Answer:
// Event delegation is a technique in JavaScript where we delegate the responsibility 
// of handling an event to a parent element. By doing so, we avoid attaching multiple 
// event listeners to individual elements, especially when dealing with a large number 
// of similar elements.
// But, how an event triggered at a child is identified by the event listener 
// defined on the parent?
// Due to Event Bubbling.

// E.g.:
// In our case, suppose upon clicking any of the span we want to route the user
// to that product's page. E.g clicking on span with Headphone should route us
// to /Headphone url.
// But, we would have to define an event listener for each event listener. This 
// will lead to repetitive code. Also, if a new span is added dynamically, we can't
// have an event listener for it automatically.
// We can prevent this by event delegation. Add even listener only to the parent
// of all the spans i.e. to the products div.

// document.querySelector('.products').addEventListener('click', function (event) {
//     console.log(event); // for checking event object properties available

//     if(event.target.tagName === "SPAN") { // clicked on span
//         window.location.href += "/" + event.target.className; // update url with that span product's route for routing
//     }
// });


// Question - Create a Modal which closes by clicking on negative space i.e. 
// anywhere outside the modal.
// Answer:
// const container = document.querySelector('.modalContainer');
// const button = document.querySelector('.modalButton');

// button.addEventListener('click', () => {
//     toggleModal(true);
// });

// function toggleModal(toggle) {
//     container.style.display = toggle ? "flex" : "none";
// }

// container.addEventListener('click', (e) => {
//     if(e.target.className === 'modalContainer') { // w/o this check, even clicking 
//     // on modal closes the modal due to Event Bubbling.
//         toggleModal(false);
//     }
// });