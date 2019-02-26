const frameModule = require("ui/frame");
const StartupDetailViewModel = require("./startup-detail-viewmodel");

function onNavigatingTo(args) {
    const page = args.object;

    page.bindingContext = new StartupDetailViewModel(args.context);
}

function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    frameModule.getFrameById("top-frame").parent.goBack();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;

