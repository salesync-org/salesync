function themeSwitcher() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
    } else {
        document.documentElement.classList.add('dark')
    }
}

export default themeSwitcher;