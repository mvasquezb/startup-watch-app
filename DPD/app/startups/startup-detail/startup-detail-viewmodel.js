const observableModule = require("tns-core-modules/data/observable");

function StartupDetailViewModel(startup) {
    const viewModel = observableModule.fromObject({
        startup: startup,
    });

    return viewModel;
}

module.exports = StartupDetailViewModel;