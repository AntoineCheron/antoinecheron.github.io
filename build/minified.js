var ACTIVE_CLASS = 'active';
var WHITE_BG_CLASS_NAME = 'bg-white';
var Navbar = /** @class */ (function () {
    function Navbar(id, tabs, firstSectionId) {
        this.id = id;
        this.tabs = tabs;
        this.firstSectionId = firstSectionId;
    }
    Navbar.prototype.startWatchers = function () {
        this.watchActiveTab();
        this.turnNavbarBackgroundToWhiteAfterFirstSection();
    };
    Navbar.prototype.watchActiveTab = function () {};
    Navbar.prototype.turnNavbarBackgroundToWhiteAfterFirstSection = function () {
        var firstSection = document.getElementById(this.firstSectionId);
        var navbar = document.getElementById(this.id);
        if (firstSection !== null && navbar !== null) {
            var firstSectionEndY_1 = firstSection.scrollHeight;
            document.addEventListener('scroll', function () {
                if (window.scrollY > (firstSectionEndY_1) - 70)
                    navbar.classList.add(WHITE_BG_CLASS_NAME);
                else
                    navbar.classList.remove(WHITE_BG_CLASS_NAME);
            }, false);
        }
    };
    return Navbar;
}());
var NAVBAR_ID = 'navbar';
var TABS = ['about-tab', 'research-tab', 'blog-tab', 'contact-tab'];
var FIRST_SECTION_ID = 'first-section';
var navbar = new Navbar(NAVBAR_ID, TABS, FIRST_SECTION_ID);
navbar.startWatchers();
