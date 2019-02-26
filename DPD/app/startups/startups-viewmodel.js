const observableModule = require("tns-core-modules/data/observable");
const frame = require("ui/frame");

function StartupsViewModel() {
    const viewModel = observableModule.fromObject({
        startups: [
            {
                name: "Item 1",
                industry: "Industry for Item 1",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 2",
                industry: "Industry for Item 2",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 3",
                industry: "Industry for Item 3",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 4",
                industry: "Industry for Item 4",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 5",
                industry: "Industry for Item 5",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 6",
                industry: "Industry for Item 6",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 7",
                industry: "Industry for Item 7",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 8",
                industry: "Industry for Item 8",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 9",
                industry: "Industry for Item 9",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 10",
                industry: "Industry for Item 10",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 11",
                industry: "Industry for Item 11",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            },
            {
                name: "Item 12",
                industry: "Industry for Item 12",
                solution: "Solution for Item",
                country: "Country for Item",
                contactDate: "25/02/2019",
                website: "http://website.test",
                incubator: "Incubator for Item",
                favourite: false,
            }
        ],
        onItemTap(args) {
            const tappedIndex = args.index;
            frame.topmost().navigate({
                moduleName: "startups/startup-detail/startup-detail-page",
                context: this.startups[tappedIndex],
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            })
        }
    });

    return viewModel;
}

module.exports = StartupsViewModel;
