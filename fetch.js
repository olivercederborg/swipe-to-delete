const generateId = () =>
	Math.random().toString(36).substring(2, 15) +
	Math.random().toString(36).substring(2, 15)

;(async () => {
	const main = document.querySelector('main')

	const { data: users } = await axios.get(
		'https://jsonplaceholder.typicode.com/users/'
	)

	users.map(user => {
		const section = document.createElement('section')
		section.classList.add('wrapper', 'animate__animated')
		section.setAttribute('id', 'wrapper')
		section.setAttribute('id', generateId())

		main.appendChild(section)

		const deleteItem = document.createElement('button')
		deleteItem.classList.add('deleteItem')
		deleteItem.setAttribute('id', 'deleteItem')

		const trashbin = document.createElement('i')
		trashbin.classList.add('fas', 'fa-trash')

		const jokeItem = document.createElement('article')
		jokeItem.classList.add('jokeItem')
		jokeItem.setAttribute('id', 'jokeItem')
		jokeItem.textContent = user.name

		section.appendChild(deleteItem)
		section.appendChild(jokeItem)
		deleteItem.appendChild(trashbin)
	})

	const restoredItems = JSON.parse(localStorage.getItem('restoredItems'))

	if (restoredItems) {
		const restoredHeading = document.createElement('h2')
		restoredHeading.textContent = 'Restored items'
		restoredHeading.classList = 'text-white my-5 text-lg font-semibold px-2'
		main.appendChild(restoredHeading)
		restoredItems.map(user => {
			const section = document.createElement('section')
			section.classList.add('wrapper', 'animate__animated')
			section.setAttribute('id', 'wrapper')
			section.setAttribute('id', generateId())

			main.appendChild(section)

			const deleteItem = document.createElement('div')
			deleteItem.classList.add('deleteItem')
			deleteItem.setAttribute('id', 'deleteItem')

			const trashbin = document.createElement('i')
			trashbin.classList.add('fas', 'fa-trash')

			const jokeItem = document.createElement('article')
			jokeItem.classList.add('jokeItem')
			jokeItem.setAttribute('id', 'jokeItem')
			jokeItem.textContent = user.name

			section.appendChild(deleteItem)
			section.appendChild(jokeItem)
			deleteItem.appendChild(trashbin)
		})
	}
})()
