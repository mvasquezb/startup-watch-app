const topmost = require("ui/frame").topmost;

function onNavigatingTo(args) {
    const page = args.object;
    const context = args.context;
    const rootPage = topmost().parent.page;
    rootPage.actionBar.title = context.name;

    page.bindingContext = {
        categoricalSource: [
            { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24 },
            { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25 },
            { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23 },
            { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24 },
            { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21 }
        ]
    };
}

exports.onNavigatingTo = onNavigatingTo;

function onNavigatingFrom(args) {
    const rootPage = topmost().parent.page;
    rootPage.actionBar.title = "DPD";
}

exports.onNavigatingFrom = onNavigatingFrom;