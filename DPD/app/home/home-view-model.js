const observableModule = require("tns-core-modules/data/observable");
const usersService = require("~/services/user-service");
const topmost = require("ui/frame").topmost;

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        title: "DPD",
        currentUser: usersService.currentUser(),
        logout() {
            usersService.logout().then(() => {
                let topFrame = topmost();
                let rootFrame = (topFrame.id == "top-frame") ? topFrame : topFrame.parent.page.frame;
                rootFrame.navigate({
                    moduleName: "login/login-page",
                    clearHistory: true,
                });
            })
        }
    });

    return viewModel;
}

module.exports = HomeViewModel;
