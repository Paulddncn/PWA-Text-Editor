const butInstall = document.getElementById("buttonInstall");
// Logic for installing the PWA
// 1. Listen for the `beforeinstallprompt` event
// 2. Store the event in a variable
// 3. Remove the `hidden` class from the install button
// 4. Add a click event handler to the install button and call the `prompt()` method on the event
// 5. Add an `appinstalled` event handler to the window and log a message to the console
// 6. Add a `deferredprompt` event handler to the window and store the event in a variable

window.addEventListener('beforeinstallprompt', (event) => {

    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
  });
// // TODO: Implement a click event handler on the `butInstall` element

butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Show prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});
// // TODO: Add an handler for the `appinstalled` event

window.addEventListener('appinstalled', (event) => {
  // Clear prompt
  window.deferredPrompt = null;
}); 



