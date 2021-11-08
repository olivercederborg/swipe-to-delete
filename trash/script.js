const main = document.querySelector('main')
const jokeItem = document.querySelector('#jokeItem')
const allJokeItems = document.querySelectorAll('.wrapper')
const restoreItem = document.querySelector('#restoreItem')
const nav = document.querySelector('nav')

const deleteButtonWidth = window.screen.width * 0.3

let touchCoordinateStart
let touchCoordinateMove
let touchCoordinateEnd
let parentElement
let touchElement

const deletedItemsStorage = JSON.parse(localStorage.getItem('deletedItems'))
let trash = deletedItemsStorage || []

const restoredItemsStorage = JSON.parse(localStorage.getItem('restoredItems'))
let restoredItems = restoredItemsStorage || []

// Create element to delete all items
const deleteAllElement = document.createElement('button')
deleteAllElement.classList = 'text-white'
deleteAllElement.innerText = 'Delete All'

if (trash.length) {
	nav.appendChild(deleteAllElement)
	deleteAllElement.onclick = onDeleteAll
}

// Main swipe functionality
main.addEventListener('touchstart', e => {
	console.log('touch start')

	if (e.target.id == 'jokeItem') {
		parentElement = e.target.parentElement
		touchElement = e.target
		touchCoordinateStart = Math.floor(e.touches[0].clientX)

		touchElement.addEventListener('touchmove', e => {
			touchCoordinateMove = Math.floor(e.touches[0].clientX)

			if (
				touchCoordinateMove < touchCoordinateStart &&
				touchCoordinateMove > touchCoordinateStart - deleteButtonWidth
			) {
				touchElement.style.transform = `translateX(${
					touchCoordinateMove - touchCoordinateStart
				}px)`
			}
		})

		touchElement.addEventListener('touchend', e => {
			touchCoordinateEnd = Math.floor(e.changedTouches[0].clientX)

			if (
				touchCoordinateEnd <
				touchCoordinateStart - deleteButtonWidth / 2
			) {
				touchElement.style.transform = `translateX(-${deleteButtonWidth}px)`
			} else {
				touchElement.style.transform = `translateX(${e.target.offsetLeft})`
			}
		})
	}

	// Event listener for restore item
	parentElement.querySelector('.restoreItem').onclick = onRestoreItem
})

// Functions
function onRestoreItem() {
	parentElement.classList.add('animate__fadeOutLeft')

	const userObject = {
		id: parentElement.id,
		name: parentElement.textContent
	}

	trash = trash.filter(item => userObject.id !== item.id)
	localStorage.setItem('deletedItems', JSON.stringify(trash))

	restoredItems.push(userObject)
	localStorage.setItem('restoredItems', JSON.stringify(restoredItems))

	setTimeout(() => {
		parentElement.classList.add('collapsed')
	}, 400)

	setTimeout(() => {
		parentElement.remove()
	}, 500)

	if (!trash.length) {
		deleteAllElement.remove()
	}
}

function onDeleteAll() {
	trash = []
	localStorage.setItem('deletedItems', JSON.stringify(trash))
	allJokeItems.forEach(item => {
		item.classList.add('animate__fadeOutLeft')
		setTimeout(() => {
			item.classList.add('collapsed')
		}, 400)

		setTimeout(() => {
			item.remove()
		}, 500)

		if (!trash.length) {
			deleteAllElement.remove()
		}
	})
}
