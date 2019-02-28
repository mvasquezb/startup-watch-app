const frameModule = require("ui/frame");
const FavouritesViewModel = require("./favourites-viewmodel");

function onNavigatingTo(args) {
    const page = args.object;
    let rootFrame = frameModule.getFrameById("favourites-frame");
    rootFrame.actionBarVisibility = "never";

    const viewModel = new FavouritesViewModel();
    page.bindingContext = viewModel;
}

exports.onNavigatingTo = onNavigatingTo;