export function makeGuide(pos) {
	const guide = document.createElement('div')
	const label = document.createElement('span')
	const line = document.createElement('div')

	guide.style.zIndex = 999
	guide.style.width = '100%'
	guide.style.position = 'absolute'
	guide.style.top = `${pos}px`
	guide.style.left = 0

	label.style.borderWidth = 0
	label.style.borderStyle = 'dashed'
	label.style.position = 'absolute'
	label.style.padding = '2px 5px'

	document.body.appendChild(guide)

	return {
		remove() {
			document.body.removeChild(guide)

			return this
		},
		color(value) {
			// guide.style.borderTopColor = value
			line.style.borderLeftColor = value
			label.style.color = value
			label.style.borderColor = value

			return this
		},
		fixed() {
			guide.style.position = 'fixed'

			return this
		},
		label(text, top) {
			label.innerHTML = text

			guide.appendChild(label)

			if (top) {
				label.style.bottom = 0
				label.style.borderBottomWidth = '1px'
			} else {
				label.style.top = 0
				label.style.borderTopWidth = '1px'
			}

			return this
		},
		col(i) {
			guide.style.left = `${20 * i}px`

			return this
		},
		width(w) {
			label.style.width = w

			return this
		},
		line(h) {
			line.style.borderLeft = '1px dashed green'
			line.style.position = 'absolute'
			line.style.top = 0
			line.style.left = 0
			line.style.width = '1px'
			line.style.height = `${h}px`

			guide.appendChild(line)

			return this
		}
	}
}

export default (timelines, options) => {
	let guides = []

	const draw = () => {
		guides.forEach(guide => guide.remove())
		guides = []

		timelines.forEach(t => {
			const start = t.options.start() + t.options.offset()
			const end = (t.options.start() + t.options.length()) - t.options.offset()

			guides.push(
				makeGuide(start)
					.color(t.options.color)
					.label(t.options.label)
			)

			guides.push(
				makeGuide(end)
					.color(t.options.color)
					.label(t.options.label, true)
			)
		})

		guides.push(
			makeGuide(options.source())
				.color('red')
				.width('100%')
				.label('')
				.fixed()
		)
	}

	window.addEventListener('resize', draw)
	draw()
}
