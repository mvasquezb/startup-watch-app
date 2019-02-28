const StartupsViewModel = require("~/startups/startups-viewmodel");

function FavouritesViewModel() {
    const viewModel = new StartupsViewModel(true);

    return viewModel;
}

module.exports = FavouritesViewModel;