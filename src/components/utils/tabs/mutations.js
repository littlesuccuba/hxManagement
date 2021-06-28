export default {
    add_tabs (state, data) {
        // console.log(this.state.tabs.openTab)
        this.state.tabs.openTab.push(data)
    },
    delete_tabs (state, route) {
        let index = 0
        for (let gohh of state.tabs.openTab) {
          if (gohh.route === route) {
            break
          }
          index++
        }
        this.state.tabs.openTab.splice(index, 1)
    },
    set_active_index (state, index) {
        this.state.tabs.activeIndex = index
    }
}