if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        );
      },
      err => {
        console.log('ServiceWorker registration failed: ', err);
      },
    );
  });
}

class PWAPrompt {
  constructor() {
    this.promptEvent = null;
    window.addEventListener(
      'beforeinstallprompt',
      this.onBeforeInstallPrompt.bind(this),
    );
  }

  onBeforeInstallPrompt(event) {
    event.preventDefault();
    this.promptEvent = event;
  }

  showPrompt() {
    if (!this.promptEvent) {
      return Promise.reject();
    }

    this.promptEvent.prompt();

    return new Promise((res, rej) => {
      this.promptEvent.userChoice.then(choiceResult => {
        this.promptEvent = null;
        if (choiceResult.outcome === 'accepted') {
          res();
        } else {
          rej();
        }
      });
    });
  }
}

export const pwaPrompt = new PWAPrompt();
