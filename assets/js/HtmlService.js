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
            this.addItem(form.item.value);
            form.reset();
        })
    }

    async listItems() {
        const items =  await this.groceryListService.getAll();
        items.forEach(item => this.addToHtmlList(item));
    }

    async addItem(product){
        const item = {product, checked: false};
        const itemId = await this.groceryListService.save(item);
        item.id = itemId;
        this.addToHtmlList(item);
    }

    async saveItem(itemId, isChecked){
        const item = await this.groceryListService.get(itemId);
        item.checked = isChecked;
        this.groceryListService.save(item);
    }

    toggleItem(li){
        const itemId = +li.getAttribute('data-item-id');
        li.classList.toggle('checked');
        const isChecked = li.classList.contains('checked');
        this.saveItem(itemId, isChecked);
    }

    addToHtmlList(item){
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        li.setAttribute('data-item-id', item.id);
        li.addEventListener('click', () => this.toggleItem(li));

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