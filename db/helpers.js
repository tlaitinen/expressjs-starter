module.exports = {
  count: (p) => {
    return p.then(row => {
      return parseInt(row.count);
    });
  },
  json: (p) => {
    return p.then(r => {
      if (r instanceof Array) {
        return r.map(row => row.json);
      } else {
        return r.json;
      }
    });
  }
};
