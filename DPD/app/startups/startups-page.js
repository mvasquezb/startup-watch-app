const frameModule = require("ui/frame");
const StartupsViewModel = require("./startups-viewmodel");

let viewModel = null;

function onNavigatingTo(args) {
    const page = args.object;
    if (viewModel == null) {
        viewModel = new StartupsViewModel();
        viewModel.refreshData();
    }
    page.bindingContext = viewModel;
    frameModule.topmost().actionBarVisibility = "never";
}

exports.onNavigatingTo = onNavigatingTo;

function onFavouriteTap(args) {
    const page = args.object.page;
    const viewModel = page.bindingContext;
    viewModel.onFavouriteTap(args);
}

exports.onFavouriteTap = onFavouriteTap;

function buttonLoaded(args) {
    const button = args.object;
    button.android.setFocusable(false);
}

exports.buttonLoaded = buttonLoaded;

function searchBarLoaded(args) {
    const searchBar = args.object;
    searchBar.android.clearFocus();
}

exports.searchBarLoaded = searchBarLoaded;