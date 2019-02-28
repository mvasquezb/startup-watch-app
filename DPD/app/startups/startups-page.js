const frameModule = require("ui/frame");
const StartupsViewModel = require("./startups-viewmodel");

let viewModel = null;

function onNavigatingTo(args) {
    const page = args.object;
    if (viewModel == null) {
        viewModel = new StartupsViewModel();
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