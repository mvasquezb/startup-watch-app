const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const frame = require("ui/frame");
const dialogs = require("tns-core-modules/ui/dialogs");
const startupsService = require("~/services/startup-service");

const spreadsheetId = '1KSe1V27k_RY4cE7gIcUJD0Kaca9uRyQKNdoTLLVisj0';
const range = "Sheet1";

function StartupsViewModel() {
    const viewModel = observableModule.fromObject({
        startups: null,
        visibleItems: [],
        filter: null,
        loading: true,
        refreshData() {
            this.loading = true;
            startupsService.getStartups(spreadsheetId, range)
                .then((startups) => {
                    this.startups = startups.map((e) => observableModule.fromObjectRecursive(e));
                    this.visibleItems = this._getVisibleItems();
                    if (this.filter) {
                        this.filterItems(this.filter)
                    }
                })
                .catch((e) => {
                    dialogs.alert(e.message);
                })
                .finally(() => this.loading = false);
        },
        _getVisibleItems() {
            return this.startups;
        },
        filterItems(filter) {
            visibleItems = this.startups.filter((value) => {
                return value.name.includes(filter)
                    || value.industry.includes(filter)
                    || value.solution.includes(filter)
                    || value.country.includes(filter)
                    || value.contactDate.includes(filter)
                    || value.website.includes(filter)
                    || value.incubator.includes(filter);
            });
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
    viewModel.refreshData();

    return viewModel;
}

module.exports = StartupsViewModel;