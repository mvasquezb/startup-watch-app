const frameModule = require("ui/frame");
const StartupsViewModel = require("./startups-viewmodel");

function onNavigatingTo(args) {
    const page = args.object;
    const viewModel = new StartupsViewModel();
    page.bindingContext = viewModel;
    frameModule.topmost().actionBarVisibility = "never";
}

exports.onNavigatingTo = onNavigatingTo;