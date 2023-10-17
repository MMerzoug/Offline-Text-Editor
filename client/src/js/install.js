const butInstall = document.getElementById('buttonInstall');

// Install the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Store previous click history
    window.deferredPrompt = event;

     // Enable button on click
     butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
    
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    // display prompt message
  promptEvent.prompt();

   // Disable prompt after click
   window.deferredPrompt = null;

   butInstall.classList.toggle('hidden', true);

});


window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
