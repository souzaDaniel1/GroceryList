export default class HtmlService {

    constructor(groceryListService) {
        this.groceryListService = groceryListService;
        this.bindFormEvent();
        this.listItems();
    }

    bindFormEvent() {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            console.log(form.item.value);
            form.reset();
        })
    }

    async listItems() {
        const items =  await this.groceryListService.getAll();
        items.forEach(item => this.addToHtmlList(item));
    }

    addToHtmlList(item){
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        li.setAttribute('data-item-id', item.id);
        span.textContent = item.product;
        button.textContent = 'x';

        if (item.checked){
            li.classList.add('checked')
        }

        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
    }
}