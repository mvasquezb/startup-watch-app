const observableModule = require("tns-core-modules/data/observable");
const usersService = require("~/services/user-service");


function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        currentUser: usersService.currentUser(),
    });

    return viewModel;
}

module.exports = HomeViewModel;
