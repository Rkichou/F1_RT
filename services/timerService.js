const Timer = require('../src/models/Timer');
const validator = require('../src/utils/validator');

exports.submitReactionTime = async (userId, time) => {
  // Validate the reaction time input
  const { valid, errors } = validator.validateReactionTime(time);
  if (!valid) {
    throw { status: 400, message: errors }; // Throw validation errors
  }

  // Create and save the new Timer object
  const timer = new Timer({
    user_id: userId,
    time,
  });

  await timer.save();

  return timer;
};

exports.getReactionTimes = async (userId, sort, filter) => {
  // Build query for the user's reaction times
  let query = { user_id: userId };

  // Filter based on a date range (if provided)
  if (filter) {
    const [startDate, endDate] = filter.split(',');
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
  }

  // Sort results (default: descending by creation date)
  let sortOption = {};
  if (sort === 'asc') {
    sortOption.time = 1;
  } else if (sort === 'desc') {
    sortOption.time = -1;
  } else {
    sortOption.createdAt = -1;
  }

  // Retrieve the user's reaction times
  const timers = await Timer.find(query).sort(sortOption);

  return timers;
};
