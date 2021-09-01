function LimitString(str, amo) {
    if (str.length > amo) {
        return str.slice(0, amo) + '...'
    } else {
        return str
    }
}