const frame = require("ui/frame");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = args.context;
}