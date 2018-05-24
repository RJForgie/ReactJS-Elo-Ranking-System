import { DefaultSettings } from './defaultSettings';

var winner = null;
var loser = null;

function UpdatePlayerRating(winner, loser) {
    
    var firstNewRating = newRating(winner, loser);
    var secondNewRating = newRating(loser, winner);
    // firstPlayer.setRating(firstNewRating);
    // secondPlayer.setRating(secondNewRating);
    console.log(firstNewRating)
    console.log(secondNewRating)
}

function transformedRating(player) {
    return Math.pow(10, player.rating/400);
};

function expectedScore(firstPlayer, secondPlayer) {
    var firstPlayerTranRating = transformedRating(firstPlayer);
    var secondPlayerTranRating = transformedRating(secondPlayer);
    return firstPlayerTranRating / (firstPlayerTranRating + secondPlayerTranRating)
};

function newRating(primaryPlayer, otherPlayer) {
    var updatedRating = primaryPlayer.rating + kfactor(primaryPlayer) * (getScore(primaryPlayer) - expectedScore(primaryPlayer, otherPlayer));
    var rounded = Math.round(updatedRating)
    return rounded;
};

function getScore(player) {
    if (player.username === winner.username) return 1;
    return 0;
};

function kfactor(player) {
    if (player.numberOfGamesPlayed() < DefaultSettings.getStarterBoundry()) return 25;
    if (player.getRating() < DefaultSettings.getProRatingBoundry()) return 15;
    return DefaultSettings.getDefaultKFactor();
};

function updatePlayerRating(firstPlayer, secondPlayer) {
    var firstNewRating = newRating(firstPlayer, secondPlayer);
    var secondNewRating = newRating(secondPlayer, firstPlayer);
    firstPlayer.setRating(firstNewRating);
    secondPlayer.setRating(secondNewRating);
};

export default UpdatePlayerRating;