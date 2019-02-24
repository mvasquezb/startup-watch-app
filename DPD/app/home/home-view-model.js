const observableModule = require("tns-core-modules/data/observable");
const usersService = require("~/services/user-service");
const topmost = require("ui/frame").topmost;

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        currentUser: usersService.currentUser(),
        logout() {
            usersService.logout().then(() => {
                topmost().navigate({
                    moduleName: "login/login-page",
                    clearHistory: true,
                });
            })
        }
    });

    return viewModel;
}

module.exports = HomeViewModel;
