const Observable = require("tns-core-modules/data/observable").Observable;
const topmost = require("ui/frame").topmost;
const CountryIndustryViewModel = require("./country-industry-viewmodel");
const BarSeries = require("nativescript-ui-chart").BarSeries;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

function onNavigatingTo(args) {
    const page = args.object;
    const viewModel = new CountryIndustryViewModel();
    page.bindingContext = viewModel;
    topmost().parent.page.actionBar.title = viewModel.name;

    const graph = page.getViewById('industry-country-chart');
    graph.series = new ObservableArray([]);
    viewModel.addEventListener(Observable.propertyChangeEvent, (args) => {
        if (args.propertyName === "data") {
            viewModel.data.forEach((series) => {
                const bar = new BarSeries();
                bar.items = series.points;
                bar.legendTitle = series.name;
                bar.categoryProperty = "country";
                bar.valueProperty = "amount";
                bar.stackMode = "Stack";
                graph.series.push(bar);
            });
        }
    })
}

exports.onNavigatingTo = onNavigatingTo;

function onNavigatingFrom(args) {
    const rootPage = topmost().parent.page;
    rootPage.actionBar.title = "DPD";
}

exports.onNavigatingFrom = onNavigatingFrom;