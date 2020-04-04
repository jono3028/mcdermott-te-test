import moment from 'moment';

export const collectionConfigs = new Map ([
  ['bondFilms', {
    collectionName: "Bond Films",
    fields: {
      filmTitle: ["Film"],
      leadActor: ["Bond Actor"],
      ukRelease: ["UK release date", d => moment(d, 'D MMMM YYYY')],
      imageURL: ["ImageURL"],
      description: ["Description"],
      boxOfficeTake: ["Box Office(Millions)", c => `£${c} million`]
    }
  }]
])
