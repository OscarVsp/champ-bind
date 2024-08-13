export async function edit_input_settings(settings_data) {
    const res = await fetch('/lol-settings/v2/account/GamePreferences/input-settings',
        {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"schemaVersion":1, "data":settings_data})
        })
    if (res.status == 200) {
        return true
    } else {
        console.log("Error editing input setting:\n"+res)
        return false
    }
}

export async function save_settings() {
    const res = await fetch('/lol-settings/v1/account/save', 
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
        if (res.status == 200) {
            return true
        } else {
            console.log("Error editing input setting:\n"+res)
            return false
        }
}

export async function get_current_settings() {
    const res = await fetch('/lol-settings/v2/account/GamePreferences/input-settings')
    const data = await res.json()
    if (data.status == 200) {
        return data
    } else {
        console.log("Error editing input setting:\n"+data)
        return null
    }
}