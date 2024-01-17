const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);

module.exports = async Client => {
    (await pGlob(`${process.cwd()}/src/selects/**/*.js`)).map(async selectMenuFile => {
        const selectMenu = require(selectMenuFile)

        if (!selectMenu.name) return console.log(`[SLC] - Événement non chargé/déclenché : Erreur de type (ou pas de nom) - Fichier : ${eventFile}`);

        if (selectMenu.once) {
            Client.once(selectMenu.name, (...args) => selectMenu.execute(...args))
        } else {
            Client.on(selectMenu.name, (...args) => selectMenu.execute(...args))
        }
        // console.log(`[EVT] - Événement déclenché : ${selectMenu.name}`)
    })
}