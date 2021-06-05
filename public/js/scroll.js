// Check if the text box is visible in window space then make opacity visible?
// Navigation thingo should work with IDs. 

// populating nav with the right jump links 
const sections = document.querySelectorAll('section.contain')
var nav = document.querySelector('nav#jump-links')
sections.forEach(function (section, index) {
    let jumpLink = document.createElement('a')
    jumpLink.setAttribute('href', '#' + section.id)
    jumpLink.innerHTML = section.id.replace('-', ' ')
    if (section.id == "") {
        jumpLink.setAttribute('style', 'display: none')
    }
    nav.appendChild(jumpLink)
})

// smooth scrolling found on stack exchange
// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// var previousChild = null
// calculating page height and checking whether element is at the top
// x = every section's height before it
// if greater than (x) and less than (x) + own-height
window.addEventListener('scroll', function () {
    let indexInView = null

    // checking if each section is in view
    sections.forEach(function (section, index) {
        if (isScrolledIntoView(section, 'partial')) {
            if (section.id != "") {
                indexInView = index
            } else {
                indexInView = index - 1
            }
        }

        // checking subsections
        if (section.querySelector('section.text').childElementCount > 1) {
            let children = section.querySelectorAll('article')
            children.forEach(function (child) {

                if (isScrolledIntoView(child, 'full')) {
                    
                    if (child.id != '') {
                    //     if (child.id != previousChild) {
                    //         previousChild = child.id
                            plotChange(child.id) // relayouts are in func
                            return
                        // }
                        // detects the child
   // Detecting on load of plots

                            
                        
                        // console.log(child.id)
                    }
                    // corresponding child --> activate corresponding function
                    // console.log(child)
                    // plotChange(section, child, child.getAttribute('state'))
                } else {
                    // console.log(child)
                    // resetChange(section, child, child.getAttribute('state'))
                }
            })
        }
    })

    // changing colour of nav if in a different section 
    if (sections[indexInView].classList.contains('light')) {
        nav.classList.add('dark')
    } else {
        nav.classList.remove('dark')
    }

    if (sections[indexInView].classList.contains('full-screen')) {
        nav.classList.add('hide')
    } else {
        nav.classList.remove('hide')
    }


    // setting the relevant jumpLink to be active
    nav.querySelectorAll('a').forEach(function (jumpLink, jumpLinkIndex) {
        jumpLink.classList.remove('active')
        if (jumpLinkIndex == indexInView) {
            jumpLink.classList.add('active')
        }
    })
})

// checking whether an element is in window view 
// function for checking if element is in view of the window https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
function isScrolledIntoView(el, mode) {
    var rect = el.getBoundingClientRect(),
        elemTop = rect.top,
        elemBottom = rect.bottom,
        isVisible;

    if (mode == 'full') {
        isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    } else if (mode == 'partial') {
        isVisible = elemTop < window.innerHeight / 3 && elemBottom >= 0;
    }
    // Only completely visible elements return true:

    // Partially visible elements return true:
    // var isVisible = elemTop < window.innerHeight / 3 && elemBottom >= 0;
    return isVisible;
}

// function isPartialIntoView(el) {
//     var rect = el.getBoundingClientRect(),
//         elemTop = rect.top,
//         elemBottom = rect.bottom;

//     // Only completely visible elements return true:
//     // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//     // Partially visible elements return true:
//     var isVisible = elemTop < window.innerHeight / 3 && elemBottom >= 0;
//     return isVisible;
// }