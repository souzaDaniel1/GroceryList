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
        const items = await this.groceryListService.getAll();
        items.forEach(item => this.addToHtmlList(item));
    }

    async addItem(product) {
        const item = { product, checked: false };
        const itemId = await this.groceryListService.save(item);
        item.id = itemId;
        this.addToHtmlList(item);
        
    }

    async saveItem(itemId, isChecked) {
        const item = await this.groceryListService.get(itemId);
        item.checked = isChecked;
        this.groceryListService.save(item);
        this.addToHtmlList(item);
    }

    async deleteTask(li) {
        const itemId = +li.getAttribute('data-item-id');
        await this.groceryListService.delete(itemId);
        li.remove();
    }

    toggleItem(li) {
        const itemId = +li.getAttribute('data-item-id');
        li.classList.toggle('checked');
        const isChecked = li.classList.contains('checked');
        this.saveItem(itemId, isChecked);
        li.remove();
    }

    addToHtmlList(item) {
        const ulUnchecked = document.getElementById('unchecked-items');
        const ulChecked = document.getElementById('checked-items');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        li.setAttribute('data-item-id', item.id);
        li.addEventListener('click', () => this.toggleItem(li));

        span.textContent = item.product;
        button.textContent = 'x';
        button.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteTask(li);
        })

        if (item.checked) {
            li.classList.add('checked')
            li.appendChild(span);
            li.appendChild(button);
            ulUnchecked.appendChild(li);
        }
        else {
            li.appendChild(span);
            li.appendChild(button);
            ulChecked.appendChild(li);
        }
    }
}