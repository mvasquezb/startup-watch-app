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
        loading: true,
        refreshData() {
            this.loading = true;
            startupsService.getStartups(spreadsheetId, range)
                .then((startups) => {
                    this.startups = startups.map((e) => observableModule.fromObjectRecursive(e));
                })
                .catch((e) => {
                    dialogs.alert(e.message);
                })
                .finally(() => this.loading = false);
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