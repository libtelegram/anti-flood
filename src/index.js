exports.omission = (opts, callback) => {
  const delayS = opts.delay || .5;

  const delayMS = delayS * 1000;

  return (usr, msg, next) => {
    const now = +new Date();

    const lastMessage = usr._last_message_date;

    usr._last_message_date = now;

    if (!lastMessage) {
      return next();
    }

    if (now - lastMessage > delayMS) {
      return next();
    }

    if (typeof callback === 'function') {
      return callback(usr, msg);
    }
  };
};

exports.penalty = (opts, callback) => {
  const maxAttempts = opts.maxAttempts || 5;
  const timeLimit = opts.timeLimit || 2;
  const timeBlocked = opts.timeBlocked || 60;

  return (usr, msg, next) => {
    const now = +new Date();

    if (usr.timeBlocked && now - usr.timeBlocked < timeBlocked * 1000) {
      return;
    }

    const lastMessages = usr._last_message_dates;

    if (!lastMessages) {
      usr._last_message_dates = [now];

      return next();
    }

    lastMessages.push(now);

    if (lastMessages.length === maxAttempts) {
      const firstMessage = lastMessages.shift();

      if (now - firstMessage < timeLimit * 1000) {
        usr.timeBlocked = now;

        if (typeof callback === 'function') {
          return callback(usr, msg);
        }

        return;
      }
    }

    return next();
  };
};
