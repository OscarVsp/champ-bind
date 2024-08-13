import {edit_input_settings, save_settings, get_current_settings}  from './utils'


export function init(context) {
    createChampSelectorSettings(context)
    context.socket.observe('/lol-champ-select/v1/current-champion', async (data) => {
        if (data != 0 && data.evenType != "Delete") {
            console.log("New champion selected:\n"+data)
            load_setting(data.data)
        }
    })

    context.socket.observe('/lol-end-of-game/v1/eog-stats-block', async (data) => {
        console.log("EOG data retrieved:\n"+data)
        const champ_id = data.localPlayer.championId
        store_keybind(champ_id)
    })
}


window.addEventListener('load', () => {

    var save_keybind = {
        name: "test load",
        group: "Keybind",
        perform: test_load
    }
    CommandBar.addAction(save_keybind)

    var load_keybind = {
        name: "test save",
        group: "Keybind",
        perform: test_save
    }
    CommandBar.addAction(load_keybind)
});

async function test_load() {
    await load_setting(55)
}

async function test_save() {
    await store_keybind(55)
}


async function store_keybind(champ_id) {
    const data = await get_current_settings()
    if (data) {
        DataStore.set("keybind_"+champ_id.toString(), data.data)
        Toast.success("Setting save for champ "+champ_id.toString())
    } else {
        Toast.error("Not able to retrieve current settings")
    }
}

async function load_setting(champ_id) {

    var data = DataStore.get("keybind_"+champ_id.toString())
    if (await edit_input_settings(data)) {
        if (await save_settings()) {
            Toast.success("Loaded settings for champ "+champ_id.toString())
        } else {
            Toast.error("Not able to validate the changes")
        }
    } else {
        Toast.error("Not able to edit the settings")
    }

    
}