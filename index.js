const main = document.querySelector('main')
const jokeItem = document.querySelector('#jokeItem')
const deleteItem = document.querySelector('#deleteItem')
const trashLink = document.querySelector('#trash-link')

const deleteButtonWidth = window.screen.width * 0.3

let touchCoordinateStart
let touchCoordinateMove
let touchCoordinateEnd
let parentElement
let touchElement

const deletedItemsStorage = JSON.parse(localStorage.getItem('deletedItems'))
const trash = deletedItemsStorage || []

const trashCounter = document.createElement('span')
trashCounter.textContent = trash.length
trashCounter.classList =
	'absolute text-xs -top-1.5 -left-1.5 bg-white grid place-items-center h-5 px-1.5 rounded-full text-black font-semibold'
trashLink.appendChild(trashCounter)

main.addEventListener('touchstart', e => {
	console.log('touch start = add click event')

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

	function onDeleteItem() {
		console.log('delete item event')
		parentElement.classList.add('animate__fadeOutLeft')

		const userObject = {
			id: parentElement.id,
			name: parentElement.textContent
		}

		trash.push(userObject)
		localStorage.setItem('deletedItems', JSON.stringify(trash))
		trashCounter.textContent = trash.length

		setTimeout(() => {
			parentElement.classList.add('collapsed')
		}, 400)

		setTimeout(() => {
			parentElement.remove()
		}, 500)
	}

	// parentElement
	// 	.querySelector('.deleteItem')
	// 	.addEventListener('click', onDeleteItem)

	parentElement.querySelector('.deleteItem').onclick = onDeleteItem
})
