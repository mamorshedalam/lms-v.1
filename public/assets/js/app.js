// SECTION TOGGLE
function toggleView(section) {
     const toggleSection = document.getElementById(section);
     const allSection = document.querySelectorAll('main section');
     allSection.forEach(item => { item.className = 'hide'; });

     toggleSection.className = 'show';
}