import { Catalog } from "./src/components/catalog.js"

const renderPostItem = item => `
    <a  
        href="/posts/${item.id}"
        class="post-item post-link"
    >
        <span class="post-item__title">
            ${item.title}
        </span>

        <span class="post-item__body">
            ${item.body}
        </span>
    </a>
`

const getPostItems = async ({ limit, page }) => {
    try {
    return await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then(async res => {
            const total = +res.headers.get('x-total-count')
            const items = await res.json()
            return { items, total }
        })
        } catch (error) {
        console.error(error)
        catalog.innerHTML = `<p class="error">Не удалось загрузить посты. Попробуйте позже.</p>`
        return { items: [], total: 0 }
        }
}

const renderPhotoItem = item => `
    <a  
        href="photos/${item.id}"
        class="photo-item"
    >
        <span class="photo-item__title">
            ${item.title}
        </span>

        <img 
            src=${item.url}
            class="photo-item__image"
        >
    </a>
`

const getPhotoItems = async ({ limit, page }) => {
    return await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
        .then(async res => {
            const total = +res.headers.get('x-total-count')
            const items = await res.json()
            return { items, total }
        })
}

const init = () => {
    const catalog = document.getElementById('catalog')
    new Catalog(catalog, { 
        renderItem: renderPostItem,
        getItems: getPostItems
     }).init()
     document.addEventListener('click', async e => {
        const link = e.target.closest('a.post-link')
        if (!link) return
    
        e.preventDefault()
    
        const postId = link.href.split('/').pop()
        history.pushState(null, '', `/posts/${postId}`)
        try {
        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        const post = await resPost.json()
    
        const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        const comments = await resComments.json()
    
        document.getElementById('catalog').innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            
            <h3>Комментарии:</h3>
            <ul>
                ${comments.map(comment => `
                    <li>
                        <strong>${comment.name}</strong> (${comment.email})<br/>
                        <p>${comment.body}</p>
                    </li>
                `).join('')}
            </ul>
    
            <a href="/catalog.html" id="back">← Назад</a>
        `
        } catch (error) {
        console.error(error)
        catalog.innerHTML = `<p class="error">Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>`
        }
    })
    window.addEventListener('popstate', () => {
        location.reload() 
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
