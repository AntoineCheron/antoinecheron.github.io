(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    define("navbar", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const WHITE_BG_CLASS_NAME = 'bg-white';
        class Navbar {
            constructor(id, tabs, firstSectionId) {
                this.id = id;
                this.tabs = tabs;
                this.firstSectionId = firstSectionId;
            }
            startWatchers() {
                this.watchActiveTab();
                this.turnNavbarBackgroundToWhiteAfterFirstSection();
            }
            watchActiveTab() {
            }
            turnNavbarBackgroundToWhiteAfterFirstSection() {
                const firstSection = document.getElementById(this.firstSectionId);
                const navbar = document.getElementById(this.id);
                if (firstSection !== null && navbar !== null) {
                    const firstSectionEndY = firstSection.scrollHeight;
                    document.addEventListener('scroll', () => {
                        if (window.scrollY > (firstSectionEndY) - 70)
                            navbar.classList.add(WHITE_BG_CLASS_NAME);
                        else
                            navbar.classList.remove(WHITE_BG_CLASS_NAME);
                    }, false);
                }
            }
        }
        exports.Navbar = Navbar;
    });
    define("main", ["require", "exports", "navbar"], function (require, exports, navbar_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const NAVBAR_ID = 'navbar';
        const TABS = ['about-tab', 'research-tab', 'blog-tab', 'contact-tab'];
        const FIRST_SECTION_ID = 'first-section';
        const navbar = new navbar_1.Navbar(NAVBAR_ID, TABS, FIRST_SECTION_ID);
        navbar.startWatchers();
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();