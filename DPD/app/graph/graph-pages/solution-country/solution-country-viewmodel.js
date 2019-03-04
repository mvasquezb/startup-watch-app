const observableModule = require("tns-core-modules/data/observable");
const dialogs = require("ui/dialogs");
const startupsService = require("~/services/startup-service");

function buildGraphData(startups) {
    let countries = Array.from(new Set(startups.map((s) => s.country)));
    let solutions = Array.from(new Set(startups.map((s) => s.solution)));

    return solutions.map((solution) => {
        return {
            name: solution,
            points: countries.map((country) => {
                return {
                    country: country,
                    amount: startups.filter((s) => s.country === country && s.solution === solution).length
                }
            })
        };
    });
}

function SolutionCountryViewModel() {
    const viewModel = observableModule.fromObject({
        data: [],
        load() {
            let startups = startupsService.getStartups()
                .then((startups) => {
                    this.data = buildGraphData(startups);
                })
                .catch((e) => {
                    dialogs.alert(e.message);
                });
        }
    });
    viewModel.load();

    return viewModel;
}

module.exports = SolutionCountryViewModel;