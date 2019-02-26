const frame = require("ui/frame");
const StartupsViewModel = require("./startups-viewmodel");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new StartupsViewModel();
}

exports.onNavigatingTo = onNavigatingTo;