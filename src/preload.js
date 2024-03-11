const { ipcRenderer, Menu } = require('electron');

// some elements have a defered load, so we need to wait for them to appear 
function waitForElm(selector) {
  console.log("checking " + selector);
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

let loadingDiv = document.createElement("div");
loadingDiv.innerHTML = `
<section>
<h2 class="splashText">Welcome back!</h2>
<br>
<h4 class="quote">Loading...</h3>
</section>
<div class="lol">
<section>
<div></div>
<div></div>
<div></div>
<div></div>
</section>
</div>
<style>
.lol {
    transform: scale(0.5)
}
.lol *, *::before, *::after {
    background-color: #ADC4CE;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.splashText {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont !important;
    font-size: 2rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.1rem !important;
    text-align: center !important;
    all: unset;
}
.quote {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.1rem !important;
    text-align: center !important;
    all: unset;
    margin-bottom: 1rem;
    color: #c1c1c1 !important;
    text-transform: uppercase !important;
}

.lol body {
align-items: center;
display: flex;
height: 100vh;
justify-content: center;
}

.lol section {
align-items: center;
display: flex;
flex-wrap: wrap;
height: 400px;
justify-content: space-evenly;
width: 400px;
}

.lol div {
height: 200px;
width: 200px;
position: relative;
}

.lol div:nth-of-type(1) {
background-color: #EF9595;
animation: okret1 2000ms linear;
z-index: 4;
}

@keyframes okret1 {
12.5% {
transform: translate(200px, 0) ;
}
25% {
transform: translate(200px, 200px) ;
}
37.5% {
transform: translate(0, 200px) ;
}
50% {
transform: translate(0, 0) ;
}
62.5% {
transform: translate(0, 200px) ;
}
75% {
transform: translate(200px, 200px) ;
}
87.5% {
transform: translate(200px, 0) ;
}
100% {
transform: translate(0, 0) ;
}

}

.lol div:nth-of-type(2) {
background-color: #EFB495;
animation: okret2 1500ms linear 250ms;
z-index: 3;
}

@keyframes okret2 {
16.66% {
transform: translate(0, 200px) ;
}
33.32% {
transform: translate(-200px, 200px) ;
}
49.98% {
transform: translate(-200px, 0) ;
}
66.64% {
transform: translate(-200px, 200px) ;
}
83.30% {
transform: translate(0, 200px) ;
};
100% {
transform: translate(0, 0) ;
}
}

.lol div:nth-of-type(4) {
background-color: #EFD595;
animation: okret3 1000ms linear 500ms;
z-index: 2;
}

@keyframes okret3 {
25% {
transform: translate(-200px, 0) ;
}
50% {
transform: translate(-200px, -200px) ;
}
75% {
transform: translate(-200px, 0) ;
};
100% {
transform: translate(0, 0) ;
}
}

.lol div:nth-of-type(3) {
background-color: #EBEF95;
animation: okret4 500ms linear 750ms;
z-index: 1;
}

@keyframes okret4 {
50% {
transform: translate(0, -200px) ;
}
100% {
transform: translate(0, 0) ;
}
} 
</style>
`;
loadingDiv.style.all = "unset";
loadingDiv.style.position = "fixed";
loadingDiv.style.top = "0";
loadingDiv.style.left = "0";
loadingDiv.style.width = "100vw";
loadingDiv.style.height = "100vh";
loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
loadingDiv.style.color = "white";
loadingDiv.style.display = "flex";
loadingDiv.style.justifyContent = "center";
loadingDiv.style.alignItems = "center";
loadingDiv.style.zIndex = "1000000"; // high enough to overlay the entire content
loadingDiv.id = "loadingDiv";

// Choose a wallpaper to use
var wp = ['https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/1.jpg?raw=true', 'https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/2.jpg?raw=true', 'https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/3.jpg?raw=true', 'https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/4.jpg?raw=true', 'https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/5.jpg?raw=true', 'https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/6.jpg?raw=true', 'https://github.com/ConwayTech-Dev/MyPolyPlus/blob/main/assets/Wallpapers/7.jpg?raw=true'];
sessionStorage.setItem('wallpaper', wp[Math.floor(Math.random() * wp.length)]);

// Add background to while loadingDiv is active
const isDivThere = new MutationObserver(() => {
    const loadingDiv = document.querySelector('.loadingDiv');
    if (loadingDiv) {
        console.log('loadingDiv has been loaded');
        var body = document.getElementsByTagName('body')[0];
        var getWp = sessionStorage.getItem('wallpaper');
        body.style.backgroundImage = `url(${getWp})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundAttachment = "fixed";
        body.style.backgroundRepeat = "no-repeat";
    }
    else {
        console.log('loadingDiv has not been loaded');
        const bodyDiv = document.querySelector('body');
        if (body) {
            var body = document.getElementsByTagName('body')[0];
            body.style.backgroundImage = "none";
        }
        else {
          return;
        }
    }
});

// Start observing the document
isDivThere.observe(document, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", async function (event) {
  // waitForElm("#img-login-logo").then((elm) => {
  //   console.log("found logo of login screen");
  //   document.body.append(loadingDiv);
  //   addQuoteToDiv();
  //   window.location.href = "https://signin.blackbaud.com/signin/?sessionClear=true&redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login";
  // })
  
  // we need this to track changes across relative urls where the domain doesnt change
  window.onhashchange = function () {
    console.log("window changed");
    console.log(window.location.href);

    
// check if we are logged into the main page rather than using cookies we look for an html element
  if (document.querySelector("#site-header") != null) {
    loadingDiv.remove();
    console.log("logged in bc we see site header");
    return;
  }

    // cueck current url, if it contains "/app/student#studentmyday/progress" we logged in
    if (
      window.location.href.includes(
        "https://polytechnic.myschoolapp.com/app/student#student"
      )
    ) {
      loadingDiv.remove();
      console.log("logged in");
    }
  };
  if (
    window.location.href.includes("app#login") || window.location.href === "https://polytechnic.myschoolapp.com/app#login"
  ) {

    
    document.body.appendChild(loadingDiv);
    addQuoteToDiv();
    window.location.href =
      "https://signin.blackbaud.com/signin/?sessionClear=true&redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login";
  } 

  else if (window.location.href.includes("sso.myschoolapp.com")) {
    document.body.append(loadingDiv);
    addQuoteToDiv();
  } else if (window.location.href.includes("app.blackbaud.com/signin")) {
    document.body.append(loadingDiv);
    addQuoteToDiv();
    await waitForElm(".spa-auth-button-full");
    document.getElementsByClassName("spa-auth-button-full")[0].click();
  } else if (
    window.location.href.includes(
      "https://accounts.google.com/o/oauth2/auth"
    ) &&
    window.location.href.includes("bbid.blackbaud.com")
  ) {
    document.body.append(loadingDiv);
    addQuoteToDiv();
   
    setTimeout(() => {
      // find all elements with [authuser] field and loop over them checking text content
      let authUsers = document.querySelectorAll("[data-authuser]");

      for (let i = 0; i < authUsers.length; i++) {
        if (authUsers[i].innerText.includes("students.polytechnic.org")) {
          authUsers[i].click();
          break;
        }
        else if (authUsers[i].innerText.includes("@polytechnic.org")) {
          authUsers[i].click();
          break;
        }
      }
    }, 450);

    setInterval(() => {
      let authUsers = document.querySelectorAll("[data-authuser]");
 
      for (let i = 0; i < authUsers.length; i++) {
        if (authUsers[i].innerText.includes("students.polytechnic.org")) {
          authUsers[i].click();
          break;
        }
        else if (authUsers[i].innerText.includes("@polytechnic.org")) {
          authUsers[i].click();
          break;
        }
      }
    }, 5000);
  }
});
function addQuoteToDiv() {
  loading_messages = [
    "Rearranging the cosmos for your homework…",
    "Loading your assignments faster than you can write 'procrastination'…",
    "Brewing coffee for the late-night study sessions…",
    "Polishing all the apples for the teachers…",
    "Calculating the minimum amount of effort required for an A…",
    "Taking a quick power nap before your next class…",
    "Deciphering teacher's handwriting…",
    "Getting our ducks in a row. And yes, we mean literal ducks…",
    "Cranking up the motivation speakers to 11…",
    "Loading motivational quotes… Error: too inspired to continue…",
    "Counting all the pencils in the world for you to borrow…",
    "Compressing all nighters into power naps…",
    "Finding more creative excuses for not doing homework…",
    "Downloading a sense of humor for the upcoming math class…",
    "Inventing a time machine for last-minute assignment submissions…",
    "Persuading your text books to open themselves…",
    "Chasing down the dog that ate your homework…",
    "Fluffing up the clouds in daydreams…",
    "Sharpening digital pencils… because you never know…",
    "Rewriting history, because your essay didn’t…",
    "Juggling deadlines and procrastination like a circus act…",
    "Engaging warp speed for this loading page…",
    "Microwaving leftovers because study breaks are sacred…",
    "Hiring a detective to find where the last hour went…",
    "Trying to convince your assignments to complete themselves…",
    "Upgrading your brain's software… Please wait…",
    "Loading the smell of old books and new possibilities…",
    "Uncovering the secrets of the Bermuda Triangle for your geography homework…",
    "Training carrier pigeons to submit your assignments…",
    "Bribing the Wi-Fi hamsters with extra seeds…",
    "Digging through the library of Alexandria for your research paper…",
    "Hunting down the elusive 'page 404' students have cited in their bibliography…",
    "Consulting the Oracle for the answers to your next test…",
    "Knocking on wood for those superstitious about exams…",
    "Rescuing your focus from the clutches of social media…",
    "Firing the cannon of success for your upcoming presentation…",
    "Googling 'How to become a wizard' to deal with this term’s workload…",
    "Stretching time so you can meet your deadline…",
    "Assembling a team of scholarly ninjas for peer reviews…",
    "Rolling out the red carpet for your GPA…",
    "Training your brain to enjoy studying… by bribing it with chocolate…",
    "Running a marathon on Encyclopedia pages… metaphorically…",
    "Filling the idea tank to the brim…",
    "Smuggling forbidden knowledge from the secret school archives…",
    "Setting up a playdate with Plato and Socrates…",
    "Organizing a pep rally for your morale…",
    "Doing a rain dance for extra inspiration… because why not…",
    "Whispering sweet nothings to the database for faster responses…",
    "Using telepathy to contact the server… Results uncertain…",
    "Enrolling pigeons in flight school to deliver your assignments…",
    "Packing your backpack with ambition and snacks… 80% snacks…",
    "Hiring squirrels to gather nuts of wisdom for the winter semester…",
    "Loading… because even your computer needs a moment to think about calculus…",
    "Asking a genie for more wishes... and more time for exam prep…",
    "Crafting a cloak of invisibility for those days you want to avoid everyone…",
    "Uploading the spirit of Einstein… Please stand by…",
    "Consulting with wizards to make your notebook self-writing…",
    "Trying to find the square root of pi for dessert…",
    "Rounding up the homework gremlins. Don’t feed them after midnight…",
    "Buffering… Just like your brain before the first coffee of the day…",
    "Programming the robots to attend 8 AM classes for you…",
    "Asking the magic 8-ball if you'll pass this semester… Outlook good…",
    "Dusting off the dictionaries for that perfect essay word…",
    "Tuning the instruments for your brain orchestra…",
    "Pumping the jams for a homework dance break…",
    "Inflating the balloons for your graduation party in advance…",
    "Taming the wild essays into submission…",
    "Negotiating with the alarm clock for five more minutes…",
    "Gathering the dragon balls to wish for limitless knowledge…",
    "Searching for the Holy Grail of uncopied homework ideas…",
    "Unleashing the Kraken on your study distractions…",
    "Sending carrier pigeons to remind you of due dates…",
    "Drawing straws to see who has to do the group project work…",
    "Paving the road to graduation with good intentions and late-night snacks…",
    "Deploying search and rescue for your lost motivation…",
    "Sending smoke signals to the server for faster load times…",
    "Consulting tea leaves for the outcome of your next presentation…",
    "Opening a portal for quick escapes from boring lectures…",
  ];
  const now = new Date();
  const currentHour = now.getHours();
  const dayOfMonth = now.getDate();

  // Combine the day of the month with the current hour to get a unique index for each hour of each day
  let combinedIndex = (dayOfMonth * 24 + currentHour) % loading_messages.length;
  document.querySelector(".quote").innerHTML = loading_messages[combinedIndex];
}

// Add CSS and JS to the pages
window.addEventListener('DOMContentLoaded', async () => {
// adding CSS
const head = document.getElementsByTagName('head')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://conwaytech-dev.github.io/MyPolyPlus/src/style.css';
head.appendChild(link);
});

window.addEventListener('DOMContentLoaded', async () => {
  // adding renderer.js
  const head = document.getElementsByTagName('head')[0];
  const js = document.createElement('script');
  js.src = 'https://conwaytech-dev.github.io/MyPolyPlus/src/renderer.js';
  js.type = 'text/javascript';
  head.appendChild(js);
  });

// Theming
ipcRenderer.on('change-theme', (event, theme) => {
  document.body.className = theme;
  const menu = Menu.getApplicationMenu();
  const lThemeItem = menu.getMenuItemById('light-theme');
  const dThemeItem = menu.getMenuItemById('dark-theme');

  if (theme === 'light') {
    lThemeItem.checked = true;
  }
  else if (theme === 'dark') {
    dThemeItem.checked = true;
  }

  Menu.setApplicationMenu(menu);
});

window.onload = () => {
  const theme = ipcRenderer.sendSync('get-system-theme');
  document.body.className = theme +'!important';
};







// Theming
ipcRenderer.on('change-theme', (event, theme) => {
  document.body.className = theme;
  ipcRenderer.send('update-menu-theme', theme);
});

window.onload = () => {
  ipcRenderer.send('get-system-theme');
};

ipcRenderer.on('system-theme', (event, theme) => {
  document.body.className = theme;
});