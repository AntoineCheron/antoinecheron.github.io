export type TabId = string

// const ACTIVE_CLASS = 'active'
const WHITE_BG_CLASS_NAME = 'bg-white'

export class Navbar {
  // private activeTab: TabId | undefined

  constructor(public id: string, public tabs: Array<TabId>, public firstSectionId: string) {}

  startWatchers(): void {
    this.watchActiveTab()
    this.turnNavbarBackgroundToWhiteAfterFirstSection()
  }

  watchActiveTab() : void {
    // document.addEventListener(
    //   'mouseover',
    //   (evt: MouseEvent) => {
    //     // TODO
    //   },
    //   false
    // )
  }

  turnNavbarBackgroundToWhiteAfterFirstSection(): void {
    const firstSection = document.getElementById(this.firstSectionId)
    const navbar = document.getElementById(this.id)
    if (firstSection !== null && navbar !== null) {
      const firstSectionEndY = firstSection.scrollHeight

      document.addEventListener(
        'scroll',
        () => {
          if (window.scrollY > (firstSectionEndY) - 70)
            navbar.classList.add(WHITE_BG_CLASS_NAME)
          else
            navbar.classList.remove(WHITE_BG_CLASS_NAME)
        },
        false
      )
    }
  }

}
