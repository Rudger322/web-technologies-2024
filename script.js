if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran1',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT1',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT2',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Ulgran2',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT3',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT4',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            },{
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran3',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT5',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT6',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            }
        ]
    }


    const items = new ListItems(document.getElementById('list-items'), data)

    items.render()
    items.init()

    console.log(items.renderTest(data));

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            const parents = this.el.querySelectorAll('[data-parent]')

            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]')

                open.addEventListener('click', () => this.toggleItems(parent) )
            })
        }

        this.render = function () {
            this.el.appendChild(this.renderParent(this.data))
        }

        this.renderParent = function (data) {
            
            if (data.hasChildren) {
                let parentElem = document.createElement('div');
                parentElem.classList.add('list-item', 'list-item_open');
                parentElem.setAttribute('data-parent', '');

                let mainWrap = document.createElement('div');
                mainWrap.classList.add('list-item__inner');
                
                
                const arrow = document.createElement('img');
                arrow.classList.add('list-item__arrow');
                arrow.setAttribute('src', 'img/chevron-down.png');
                arrow.setAttribute('alt', 'chevron-down');
                arrow.setAttribute('data-open', '');
                mainWrap.appendChild(arrow);
    
                const folder = document.createElement('img');
                folder.classList.add('list-item__folder');
                folder.setAttribute('src', 'img/folder.png');
                folder.setAttribute('alt', 'folder');
                mainWrap.appendChild(folder);
    
                const span = document.createElement('span');
                span.textContent = data.name;

                mainWrap.appendChild(span);
                parentElem.appendChild(mainWrap);
                let listElems = document.createElement('div');
                listElems.classList.add('list-item__items');

                let lastElem = document.createElement('div');
                lastElem.classList.add('list-item__items');
                for (let i = 0; i < data.items.length; i++) {
                    let newElems = this.renderParent(data.items[i]); 
                    
                    listElems.appendChild(newElems);
                    
                    
                }
                parentElem.appendChild(listElems);
                    
                return parentElem;
            } else{
                return this.renderChildren(data);
            }
            
            //проверка всех элементов на hasChildren
            //если hasChildren, то запускаем renderParent
            //если !hasChildren, то запускаем renderChildren
            //возвращает рендер родительского элемента

        }

        this.renderChildren = function (data) {
            let parentElem = document.createElement('div');
            parentElem.classList.add('list-item');

            let mainWrap = document.createElement('div');
            mainWrap.classList.add('list-item__inner');

            const folder = document.createElement('img');
            folder.classList.add('list-item__folder');
            folder.setAttribute('src', 'img/folder.png');
            folder.setAttribute('alt', 'folder');
            mainWrap.appendChild(folder);

            const span = document.createElement('span');
            span.textContent = data.name;

            mainWrap.appendChild(span);
            parentElem.appendChild(mainWrap);
            return parentElem;
        }

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }

        this.renderTest = function (data) {
            return `
            <div class="test">${data.name}</div>
            `
        }
    }

}
