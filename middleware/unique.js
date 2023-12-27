function validateuniqueSeatids(seatIds) {
    const uniqueSeatIds = new Set()
    for (const seatid of seatIds) {
        if (uniqueSeatIds.has(seatid)) {
            return false
        }
        uniqueSeatIds.add(seatid)
    }
    return true
}

export default validateuniqueSeatids