const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const frame = require("ui/frame");
const dialogs = require("tns-core-modules/ui/dialogs");
const startupsService = require("~/services/startup-service");

const spreadsheetId = '1KSe1V27k_RY4cE7gIcUJD0Kaca9uRyQKNdoTLLVisj0';
const range = "Sheet1";

function StartupsViewModel(favouritesOnly = false) {
    const viewModel = observableModule.fromObject({
        startups: null,
        visibleItems: [],
        filterText: null,
        loading: true,
        searchHint: "Search",
        loadData() {
            this.loading = true;
            startupsService.getStartups()
                .then((startups) => this._startupsLoaded(startups))
                .catch((e) => this._startupLoadError(e))
                .finally(() => this._startupLoadComplete());
        },
        refreshData() {
            this.loading = true;
            startupsService.getRemoteStartups(spreadsheetId, range)
                .then((startups) => {
                    this._startupsLoaded(startups);
                })
                .catch((e) => {
                    this._startupLoadError(e);
                })
                .finally(() => this._startupLoadComplete);
        },
        _startupLoadComplete () {
            this.loading = false
        },
        _startupLoadError(e) {
            dialogs.alert(e.message);
        },
        _startupsLoaded(startups) {
            this.startups = startups.map((e) => observableModule.fromObjectRecursive(e));
            this.visibleItems = this._getVisibleItems();
            if (this.filterText) {
                this.filterItems(this.filterText)
            }
        },
        _getVisibleItems() {
            if (favouritesOnly) {
                return this.startups.filter((s) => s.favourite); 
            }
            return this.startups;
        },
        filterItems(filter = this.filterText) {
            this.visibleItems = this._getVisibleItems();
            if (filter) {
                filter = filter.toLowerCase();
                this.visibleItems = this.visibleItems.filter((value) => {
                    return value.name.toLowerCase().includes(filter)
                        || value.industry.toLowerCase().includes(filter)
                        || value.solution.toLowerCase().includes(filter)
                        || value.country.toLowerCase().includes(filter)
                        || value.contactDate.toLowerCase().includes(filter)
                        || value.website.toLowerCase().includes(filter)
                        || value.incubator.toLowerCase().includes(filter);
                });
            }
        },
        onItemTap(args) {
            const tappedIndex = args.index;
            frame.topmost().navigate({
                moduleName: "startups/startup-detail/startup-detail-page",
                context: this.startups[tappedIndex],
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            })
        },
        onFavouriteTap(args) {
            const tappedIndex = this.startups.indexOf(args.object.bindingContext);
            startupsService.toggleFavourite(this.startups[tappedIndex])
                .then((startup) => {
                    this.startups[tappedIndex] = startup;
                })
                .catch((e) => {
                    dialogs.alert(e.message);
                });
        }
    });
    viewModel.loadData();
    
    viewModel.addEventListener(observableModule.Observable.propertyChangeEvent, (args) => {
        if (args.propertyName === "filterText") {
            viewModel.filterItems();
        }
    });

    return viewModel;
}

module.exports = StartupsViewModel;