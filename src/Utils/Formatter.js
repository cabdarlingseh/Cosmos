import moment from "moment";

export const formatCountdown = (launchTime) => {
    if (!moment(launchTime).isValid()) {
        return 'Invalid launch time';
    }

    const now = moment();
    const launch = moment(launchTime);

    if (launch.isBefore(now)) {
        return `Launched ${launch.fromNow()}`;
    }

    return launch.fromNow();
};