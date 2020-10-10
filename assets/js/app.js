import HtmlService from './HtmlService.js';
import GroceryListService from './GroceryListService.js';

class App {

  constructor() {
    this.registerServiceWorker();
    this.start();
  }

  start(){
    const groceryListService = new GroceryListService();
    new HtmlService(groceryListService);
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const onsuccess = () => console.log('[Service Worker] Registered');
      const onfailure = () => console.log('[Service Worker] Failed');

      navigator.serviceWorker
        .register('sw.js')
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();