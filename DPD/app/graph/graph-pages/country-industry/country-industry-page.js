const topmost = require("ui/frame").topmost;
const CountryIndustryViewModel = require("./country-industry-viewmodel");
const BarSeries = require("nativescript-ui-chart").BarSeries;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

function onNavigatingTo(args) {
    const page = args.object;
    const viewModel = new CountryIndustryViewModel();
    page.bindingContext = viewModel;
    const graph = page.getViewById('industry-country-chart');
    graph.series = new ObservableArray(viewModel.data.map((series) => {
        const bar = new BarSeries();
        bar.items = series;
        bar.categoryProperty = "Country";
        bar.valueProperty = "Amount";
        bar.stackMode = "Stack";
        return bar;
    }));
}

exports.onNavigatingTo = onNavigatingTo;

function onNavigatingFrom(args) {
    const rootPage = topmost().parent.page;
    rootPage.actionBar.title = "DPD";
}

exports.onNavigatingFrom = onNavigatingFrom;