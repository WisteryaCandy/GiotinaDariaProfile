document.addEventListener('DOMContentLoaded', function() {
    var paragraph = document.querySelector('.scrollable-paragraph');
    var container = document.querySelector('.scrollable-container');

    var isScrollingAllowed = false;

    // Function to check if the paragraph is fully scrolled
    function isParagraphFullyScrolled() {
        return paragraph.scrollHeight - paragraph.scrollTop === paragraph.clientHeight;
    }

    // Event listener for paragraph scroll
    paragraph.addEventListener('wheel', function(event) {
        // If scrolling is allowed or the paragraph is not fully scrolled yet, allow the default behavior
        if (isScrollingAllowed || !isParagraphFullyScrolled()) {
            return;
        }

        // Prevent default scroll behavior
        event.preventDefault();

        // Calculate scroll delta
        var delta = event.deltaY || event.detail || event.wheelDelta;

        // Scroll the paragraph instead of the page
        paragraph.scrollTop += delta;

        // Check if the paragraph is fully scrolled
        if (isParagraphFullyScrolled()) {
            isScrollingAllowed = true;
        }
    });

    // Event listener to prevent scrolling down the page when the paragraph is not fully scrolled
    window.addEventListener('wheel', function(event) {
        if (!isScrollingAllowed && isElementInViewport(container)) {
            event.preventDefault();
        }
    }, { passive: false });

    // Event listener to allow scrolling down the page when the paragraph is fully scrolled
    paragraph.addEventListener('scroll', function() {
        if (isScrollingAllowed && paragraph.scrollTop === 0) {
            isScrollingAllowed = false;
        }
    });

    // Function to check if the container is visible in the viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
document.getElementById("highlightButton").addEventListener("click", function() {
    this.classList.toggle("flipped");
  });

document.addEventListener('DOMContentLoaded', function() {
    var highlightButton = document.getElementById('highlightButton');
    var paragraphContent = document.querySelector('.scrollable-paragraph');
    
    // Object to store the highlighting state of each word
    var highlightState = {};

    highlightButton.addEventListener('click', function() {
        // Words to highlight
        var wordsToHighlight = ['passion for technology', 'commitment to learning', 'problem-solving','logical thinking','collaboration','Curiosity','desire','creativity','logical mindset','ERASMUS','artificial inteligence','internet of things','international exchange','ambitious','driven','pursuit of knowledge','dedication'];

        // Iterate through each word in the words to highlight
        wordsToHighlight.forEach(function(word) {
            // Check if the word is already highlighted
            var isHighlighted = highlightState[word];

            // If the word is highlighted, remove the highlighting; otherwise, highlight the word
            if (isHighlighted) {
                paragraphContent.innerHTML = paragraphContent.innerHTML.replace(new RegExp('<span class="highlighted">' + word + '</span>', 'gi'), word);
                // Update highlight state
                highlightState[word] = false;
            } else {
                var regex = new RegExp('\\b' + word + '\\b', 'gi');
                paragraphContent.innerHTML = paragraphContent.innerHTML.replace(regex, function(match) {
                    return '<span class="highlighted">' + match + '</span>';
                });
                // Update highlight state
                highlightState[word] = true;
            }
        });
    });
});

// Get toggle buttons and containers
const toggleButton1 = document.getElementById('togglebutton1');
const container1 = document.getElementById('container_scouts');
const toggleButton2 = document.getElementById('togglebutton2');
const container2 = document.getElementById('container_acces');
const toggleButton3 = document.getElementById('togglebutton3');
const container3 = document.getElementById('container_shakespeare');

function handleToggleEvent(toggleButton, container) {
    // Check if the device is a touchscreen device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

    // Function to toggle visibility of the container
    const toggleVisibility = () => {
        container.classList.toggle('visible1');
    };

    // Add event listeners based on the device type
    if (isTouchDevice) {
        // For touch devices, toggle visibility on click
        toggleButton.addEventListener('click', toggleVisibility);
    } else {
        // For non-touch devices, toggle visibility on hover
        toggleButton.addEventListener('mouseenter', toggleVisibility);
        toggleButton.addEventListener('mouseleave', toggleVisibility);

        // Close container when clicking again
        toggleButton.addEventListener('click', toggleVisibility);
    }

    // Close container when clicking inside the container
    container.addEventListener('click', (event) => {
        // Prevent the event from propagating to the parent elements
        event.stopPropagation();
        // Close the container
        container.classList.remove('visible1');
    });
}


// Add event listeners for each toggle button and container
handleToggleEvent(toggleButton1, container1);
handleToggleEvent(toggleButton2, container2);
handleToggleEvent(toggleButton3, container3);


function showProjects(toggleButton, container) {
    toggleButton.addEventListener('click', function() {
        // Hide all containers
        const allContainers = document.querySelectorAll('.All, .Gamedevelopment, .Webdevelopment, .Cprojects');
        allContainers.forEach(container => {
            container.style.display = 'none';
        });

        // Remove 'active' class from all buttons
        const allButtons = document.querySelectorAll('.navbar_frame4 p');
        allButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Show only the clicked container
        container.style.display = 'block';

        // Add 'active' class to the clicked button
        toggleButton.classList.add('active');
    });
}

// Show the 'All' container by default
const allContainer = document.getElementById('All_frame4');
allContainer.style.display = 'block';

// Add 'active' class to 'All' button by default
const allButton = document.getElementById('All_button');
allButton.classList.add('active');

const toggleButton1_frame4 = document.getElementById('All_button');
const container4 = document.getElementById('All_frame4');
const toggleButton2_frame4 = document.getElementById('gamedevelopment_button');
const container5 = document.getElementById('Gamedevelopment_frame4');
const toggleButton3_frame4 = document.getElementById('webdevelopment_button');
const container6 = document.getElementById('Webdevelopment_frame4');
const toggleButton4_frame4 = document.getElementById('cprojects_button');
const container7 = document.getElementById('Cprojects_frame4');

showProjects(toggleButton1_frame4, container4);
showProjects(toggleButton2_frame4, container5);
showProjects(toggleButton3_frame4, container6);
showProjects(toggleButton4_frame4, container7);