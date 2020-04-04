import moment from "moment";

export function getFilterLimits(data) {
  let startDate = moment('9999-01-01');
  let endDate = moment('0000-01-01');
  const dropDown = [];
  
  data.forEach(film => {
    if (film.ukRelease.isBefore(startDate)) {
      startDate = film.ukRelease;
    }
    if (film.ukRelease.isAfter(endDate)) {
      endDate = film.ukRelease;
    }
    if (dropDown.indexOf(film.leadActor) === -1) {
      dropDown.push(film.leadActor);
    } 
  });

  const options = dropDown.map((actor, idx) => {return { key: idx + 1, text: actor, value: actor }})

  return {startDate, endDate, options}
}

const filterActions = {
  startDate: (val, ref) => val.ukRelease.isSameOrAfter(ref),
  endDate: (val, ref) => val.ukRelease.isSameOrBefore(ref),
  leadActor: (val, ref) => ref.indexOf(val.leadActor) !== -1,
  favorite: (val, ref) => val.favorite === ref
}

export function applyFilters(data, filterRules) {
  if (Object.keys(filterRules).length === 0) {
    return data;
  }

  let filteredValues = data;
  for(let [key, value] of Object.entries(filterRules)) {
    const action = filterActions[key];
    filteredValues = filteredValues.filter(itm => action(itm, value));
  }

  return filteredValues;
}

export function removeEmptyFilters(value, name, activeFilters, filterLimits) {
  let active = activeFilters;
  
  switch (name) {
    case 'startDate':
    case 'endDate':
      if (value === filterLimits[name] || !value.isValid()) {
        delete active[name];
      }
      break;
    case 'leadActor':
      if (value.length === 0) {
        delete active[name];
      }
      break;
    case 'favorite':
      if (!value) {
        delete active[name];
      }
      break;
    default: 
      break;
  }

  return active;
}
