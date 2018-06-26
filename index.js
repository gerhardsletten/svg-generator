const fs = require('fs')

const out = './out'

const file = fs.readFileSync('./data/data.json')
const data = JSON.parse(file)

if (!fs.existsSync(out)){
  fs.mkdirSync(out)
}

function bgFilter(props) {
  return !!props && props.is_cat_5
}

function template ({color}) {
  return `<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="87.8701172px" height="39.6904297px" viewBox="0 0 87.8701172 39.6904297" xml:space="preserve"><g><rect x="-0.0019531" y="0.0024414" fill="${color}" width="87.8740234" height="39.6850586"/></g></svg>`
}

function writeFile(props) {
  const {color} = props
  const name = color.replace('#', '')
  return new Promise((resolve, reject) => {
    fs.writeFile(`${out}/${name}.svg`, template(props), (err) => {
        if (err) return reject(err)
        resolve()
    });
  })
}

const bgs = data['colors'].filter(bgFilter)

Promise.all(bgs.map(writeFile))
.then(() => console.log(`${bgs.length} bg-images saved!`))
.catch((error) => console.error(error))
