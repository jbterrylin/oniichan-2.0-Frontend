const vSelectMapper = (list, title, value) => {
  return list.map((data) => {
    return { title: data[title], value: data[value] };
  });
};

export default vSelectMapper;
