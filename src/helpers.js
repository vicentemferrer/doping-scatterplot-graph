async function getData(url) {
  const data = await fetch(url)
  return await data.json()
}

function parse(number) {
  return number.toString().length === 1 ? `0${number}` : number
}

function timeTemplate(time) {
  const minutes = parse(Math.floor(time / 60))
  const seconds = parse(time % 60)

  return `${minutes}:${seconds}`
}

export { getData, timeTemplate }