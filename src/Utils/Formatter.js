import moment from "moment";

export const formatCountdown = (launchTime) => {
    const now = moment();
    const launch = moment(launchTime);
    if (launch.isBefore(now)) {
        return 'Launched';
    }
    return launch.fromNow();
}