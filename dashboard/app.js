const userListItemTemplate = function (user) {
    return {
        tag: 'article',
        cls: 'app__user',
        content: [
            {
                tag: 'img',
                cls: 'app__user-image',
                attrs: {
                    src: user.picture,
                },
            },
            {
                tag: 'span',
                cls: 'app__user-title',
                content: `${user.firstName} ${user.lastName}`,
            },
            {
                tag: 'i',
                cls: ['fas', 'fa-times', 'app__user-delete'],
                attrs: {
                    'data-id': user.id
                }
            }
        ]
    };
}

class App {
    constructor(element) {
        this.htmlElement = element;

        this.onClick = this.onClick.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);

        this.htmlElement.addEventListener('click', this.onClick);
    }

    showList(force) {
        if (!this.list || force) {
            httpRequest({
                url: App.baseURL + '/user',
                headers: {
                    'app-id': App.appId,
                },
                onSuccess: (data) => {
                    this.list = data.data;
                    this.renderList();
                },
            });
        } else {
            this.renderList();
        }
    }

    renderList() {
        this.htmlElement.innerHTML = '';

        this.htmlElement.appendChild(
            templateEngine(this.list.map(userListItemTemplate))
        );
    }

    onClick(event) {
        const target = event.target;
        if (target.classList.contains('app__user-delete')) {
            this.handleDeleteClick(target.dataset.id);
        }
    }

    handleDeleteClick(id) {
        httpRequest({
            method: 'DELETE',
            url: App.baseURL + `/user/${id}`,
            headers: {
                'app-id': App.appId,
            },
            onSuccess: (data) => {
                this.list = this.list.filter(user => user.id !== data.id);
                this.renderList();
            },
        });
    }

    onCreateUser(data) {
        httpRequest({
            method: 'POST',
            url: App.baseURL + `/user/create`,
            body: JSON.stringify(data),
            headers: {
                'app-id': App.appId,
                'Content-type': 'application/json',
            },
            onSuccess: (data) => {
                console.log(data);
                this.list.push(data);
                this.renderList();
            },
        });
    }
}

App.baseURL = 'https://dummyapi.io/data/v1';
App.appId = '623a0cca3f69bb26dfa5d3f0';
