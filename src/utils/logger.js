const formatMessage = (level, message, meta = {}) => ({
  timestamp: new Date().toISOString(),
  level,
  message,
  ...meta
});

const print = (payload) => {
  const serialized = JSON.stringify(payload);
  // eslint-disable-next-line no-console
  console.log(serialized);
};

export const logger = {
  info(message, meta) {
    print(formatMessage('info', message, meta));
  },
  warn(message, meta) {
    print(formatMessage('warn', message, meta));
  },
  error(message, meta) {
    print(formatMessage('error', message, meta));
  }
};

export default logger;
