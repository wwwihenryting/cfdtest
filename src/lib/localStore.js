const COORD_KEY = 'COORD_KEY'

export const saveCoordData = (data, item_id = false) => {
    console.log('Saving coord..')
    if (!localStorage) {
        return
    }
    if (
        localStorage.getItem(COORD_KEY) === undefined ||
        localStorage.getItem(COORD_KEY) === null ||
        localStorage.getItem(COORD_KEY).length === 0
    ) {
        data = Array.isArray(data) ? data : [data]
        localStorage.setItem(COORD_KEY, JSON.stringify(data))
    } else {
        let coordData = localStorage.getItem(COORD_KEY)
        coordData = JSON.parse(coordData)
        if (!item_id) {
            coordData.push(data)
        } else {
            let item_key = Object.keys(coordData).find(key => coordData[key].id === item_id)
            coordData[item_key] = data
            console.log(item_key)
            console.log(coordData[item_key])
            console.log(coordData)
        }
        localStorage.setItem(COORD_KEY, JSON.stringify(coordData))
    }
}

export const loadCoordData = () => {
    console.log('Loading coord..')
    if (!localStorage || !localStorage.getItem(COORD_KEY)) {
        return []
    }

    return JSON.parse(localStorage.getItem(COORD_KEY))
}

export const deleteCoord = (item_id = false) => {
    console.log('Deleting coord..')
    if (!localStorage || !localStorage.getItem(COORD_KEY)) {
        return ''
    }
    if (item_id === false) {
        // localStorage.removeItem(COORD_KEY)
    } else {
        let coord_data = localStorage.getItem(COORD_KEY)
        coord_data = JSON.parse(coord_data)
        let item_key = Object.keys(coord_data).find(key => coord_data[key].id === item_id)
        coord_data.splice(item_key, 1)
        localStorage.setItem(COORD_KEY, JSON.stringify(coord_data))
    }
}
