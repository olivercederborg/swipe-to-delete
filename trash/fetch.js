const deletedItems = JSON.parse(localStorage.getItem('deletedItems'))

deletedItems.map(user => {
	const main = document.querySelector('main')

	const section = document.createElement('section')
	section.classList.add('wrapper', 'animate__animated')
	section.setAttribute('id', 'wrapper')
	section.setAttribute('id', user.id)

	main.appendChild(section)

	const restoreItem = document.createElement('div')
	restoreItem.classList.add('restoreItem')
	restoreItem.setAttribute('id', 'restoreItem')

	const restoreIcon = document.createElement('i')
	restoreIcon.classList.add('fas', 'fa-trash-restore')

	const jokeItem = document.createElement('article')
	jokeItem.classList.add('jokeItem')
	jokeItem.setAttribute('id', 'jokeItem')
	jokeItem.textContent = user.name

	section.appendChild(restoreItem)
	section.appendChild(jokeItem)
	restoreItem.appendChild(restoreIcon)
})
