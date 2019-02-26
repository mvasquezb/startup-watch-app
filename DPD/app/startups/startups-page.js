const frameModule = require("ui/frame");
const StartupsViewModel = require("./startups-viewmodel");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new StartupsViewModel();
    frameModule.topmost().actionBarVisibility = "never";
}

exports.onNavigatingTo = onNavigatingTo;