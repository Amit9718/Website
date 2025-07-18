let btns = document.querySelectorAll(".btn");
let submit = document.getElementById("submit");
let mobileMenu = document.getElementById("bar");
let navMenu = document.querySelector("nav ul");
btns.forEach(function(buttons){
    buttons.addEventListener("click",function(){
        console.log(buttons.attributes.id.value);
        if(buttons.attributes.id.value == "ui"){
            document.getElementById("uiDesign").style.display = "block";
            document.getElementById("webDesign").style.display = "none";
            document.getElementById("android").style.display = "none";
        }
        if(buttons.attributes.id.value == "web"){
            document.getElementById("uiDesign").style.display = "none";
            document.getElementById("webDesign").style.display = "block";
            document.getElementById("android").style.display = "none";
        }
        if(buttons.attributes.id.value == "mobile"){
            document.getElementById("uiDesign").style.display = "none";
            document.getElementById("webDesign").style.display = "none";
            document.getElementById("android").style.display = "block";
        }
        if(buttons.attributes.id.value == "all"){
            document.getElementById("uiDesign").style.display = "block";
            document.getElementById("webDesign").style.display = "block";
            document.getElementById("android").style.display = "block";
        }
    })
})

function downloadBtn(){
    // Send request to backend to download CV
    fetch('/api/download-cv', {
        method: 'GET'
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Amit_Das_CV.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        alert("CV Downloaded Successfully!");
    })
    .catch(error => {
        console.error('Error downloading CV:', error);
        alert("Error downloading CV. Please try again.");
    });
}
// Contact form submission (removed duplicate - using enhanced version below)

// Mobile menu toggle functionality
mobileMenu.addEventListener("click", function(){
    if(navMenu.style.display === "flex"){
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "80px";
        navMenu.style.left = "0";
        navMenu.style.width = "100%";
        navMenu.style.backgroundColor = "rgb(3, 3, 23)";
        navMenu.style.padding = "20px 0";
        navMenu.style.zIndex = "1000";
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function(){
        if(window.innerWidth <= 760){
            navMenu.style.display = "none";
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation improvements
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading state to submit button
function setLoadingState(isLoading) {
    const submitBtn = document.getElementById("submit");
    if(isLoading) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
    } else {
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    }
}

// Enhanced contact form submission
submit.addEventListener("click", function(){
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let msg = document.getElementById("msg");
    
    // Validation
    if(name.value.trim() === "" || email.value.trim() === "" || msg.value.trim() === ""){
        alert("Please fill in all fields");
        return;
    }
    
    if(!validateEmail(email.value.trim())) {
        alert("Please enter a valid email address");
        return;
    }
    
    if(msg.value.trim().length < 10) {
        alert("Please enter a message with at least 10 characters");
        return;
    }
    
    setLoadingState(true);
    
    // Send contact form data to backend
    const contactData = {
        name: name.value.trim(),
        email: email.value.trim(),
        message: msg.value.trim()
    };
    
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(data => {
        setLoadingState(false);
        if(data.success) {
            alert("Thanks for connecting! Your message has been sent successfully.");
            name.value = "";
            email.value = "";
            msg.value = "";
        } else {
            alert(data.message || "Error sending message. Please try again.");
        }
    })
    .catch(error => {
        setLoadingState(false);
        console.error('Error sending contact form:', error);
        alert("Network error. Please check your connection and try again.");
    });
});

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 300) {
        if (!document.getElementById('scrollToTop')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTop';
            scrollBtn.innerHTML = '↑';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: aqua;
                color: black;
                border: none;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: opacity 0.3s;
            `;
            scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});