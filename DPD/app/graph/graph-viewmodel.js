const observableModule = require("tns-core-modules/data/observable");
const observableArray = require("tns-core-modules/data/observable-array");
const frameModule = require("ui/frame");

function GraphsViewModel() {
    const viewModel = observableModule.fromObject({
        options: [
            {
                name: 'Industry by Country',
                page: 'graph/graph-pages/country-industry/country-industry-page'
            },
            {
                name: 'Solution Type by Country',
                page: 'graph/graph-pages/solution-country/solution-country-page'
            },
            // {
            //     name: 'Solution Type by Industry',
            //     page: 'graph/graph-pages/solution-industry/solution-industry-page'
            // },
            // {
            //     name: 'Industry by University',
            //     page: 'graph/graph-pages/industry-university/industry-university-page'
            // }
        ],
        onItemTap(args) {
            const item = this.options[args.index];
            frameModule.topmost().navigate({
                moduleName: item.page,
                context: { item },
            });
        }
    });

    return viewModel;
}

module.exports = GraphsViewModel;