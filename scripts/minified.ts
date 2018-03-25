type TabId = string

const ACTIVE_CLASS = 'active'
const WHITE_BG_CLASS_NAME = 'bg-white'

class Navbar {
  private activeTab: TabId | undefined

  constructor(public id: string, public tabs: Array<TabId>, public firstSectionId: string) {}

  startWatchers(): void {
    this.watchActiveTab()
    this.turnNavbarBackgroundToWhiteAfterFirstSection()
  }

  watchActiveTab() : void {
    document.addEventListener(
      'mouseover',
      (evt: MouseEvent) => {
        if (evt.srcElement === null) return
        const target: Element = evt.srcElement
        if (target === null) return
        const usersMouseTargetElementId: TabId = target.id

        const index = this.tabs.indexOf(usersMouseTargetElementId)

        if (index !== -1 && this.activeTab !== this.tabs[index]) {
          const newlyActiveTab = document.getElementById(this.tabs[index])
          if (newlyActiveTab === null) return
          newlyActiveTab.classList.add(ACTIVE_CLASS)

          if (this.activeTab !== undefined) {
            const previouslyActiveTab = document.getElementById(this.activeTab)
            this.activeTab = this.tabs[index]
            if (previouslyActiveTab !== null)
              previouslyActiveTab.classList.remove(ACTIVE_CLASS)
          }
        }
      },
      false
    )
  }

  turnNavbarBackgroundToWhiteAfterFirstSection(): void {
    const firstSection = document.getElementById(this.firstSectionId)
    const navbar = document.getElementById(this.id)
    if (firstSection !== null && navbar !== null) {
      const firstSectionEndY = firstSection.scrollHeight

      document.addEventListener(
        'scroll',
        () => {
          if (window.scrollY > firstSectionEndY)
            navbar.classList.add(WHITE_BG_CLASS_NAME)
          else
            navbar.classList.remove(WHITE_BG_CLASS_NAME)
        },
        false
      )
    }
  }

}

const NAVBAR_ID = 'navbar'
const TABS: Array<TabId> = [ 'about-tab', 'research-tab', 'blog-tab', 'contact-tab' ]
const FIRST_SECTION_ID = 'first-section'

const navbar = new Navbar(NAVBAR_ID, TABS, FIRST_SECTION_ID)
navbar.startWatchers()
