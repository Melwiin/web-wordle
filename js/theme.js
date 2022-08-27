

let themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", test);

function test(){
    if(themeSwitch.checked){
        console.log("dark mode enabled");

        document.documentElement.setAttribute('theme', 'dark');
    }else{
        console.log("dark mode disabled")

        document.documentElement.setAttribute('theme', 'light');
    }
}



