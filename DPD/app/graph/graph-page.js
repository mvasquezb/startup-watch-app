const frameModule = require("ui/frame");
const GraphsViewModel = require("./graph-viewmodel");

function onNavigatingTo(args) {
    const page = args.object;
    let rootFrame = frameModule.getFrameById("graph-frame");
    rootFrame.actionBarVisibility = "never";
    
    page.bindingContext = new GraphsViewModel();
}

exports.onNavigatingTo = onNavigatingTo;