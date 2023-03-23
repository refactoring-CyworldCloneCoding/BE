export default {
  createDatetime: (date: string): string => {
    return new Date(date).toISOString().replace('T', ' ').slice(0, -5);
  },
};
