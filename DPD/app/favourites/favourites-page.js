const frameModule = require("ui/frame");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = args.context;
    let rootFrame = frameModule.getFrameById("favourites-frame");
    rootFrame.actionBarVisibility = "never";
}

exports.onNavigatingTo = onNavigatingTo;