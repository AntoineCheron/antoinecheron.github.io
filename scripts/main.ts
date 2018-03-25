import { TabId, Navbar } from './navbar';

const NAVBAR_ID = 'navbar'
const TABS: Array<TabId> = [ 'about-tab', 'research-tab', 'blog-tab', 'contact-tab' ]
const FIRST_SECTION_ID = 'first-section'

const navbar = new Navbar(NAVBAR_ID, TABS, FIRST_SECTION_ID)
navbar.startWatchers()
