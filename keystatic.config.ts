import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    events: collection({
      label: 'Veranstaltungen',
      slugField: 'title',
      path: 'src/content/events/*',
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        date: fields.date({ label: 'Datum' }),
        description: fields.text({ label: 'Beschreibung', multiline: true }),
      },
    }),
    boardMembers: collection({
      label: 'Vorstand',
      slugField: 'name',
      path: 'src/content/board-members/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Rolle' }),
        email: fields.text({ label: 'E-Mail' }),
        responsibilities: fields.text({ label: 'Aufgaben', multiline: true }),
        sortOrder: fields.integer({ label: 'Sortierung', defaultValue: 0 }),
      },
    }),
    teams: collection({
      label: 'Mannschaften',
      slugField: 'name',
      path: 'src/content/teams/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        league: fields.text({ label: 'Liga' }),
        season: fields.select({
          label: 'Saison',
          options: [
            { label: 'Sommer', value: 'summer' },
            { label: 'Winter', value: 'winter' },
          ],
          defaultValue: 'summer',
        }),
        trainingDay: fields.text({ label: 'Trainingstag' }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: 'src/content/faq/*',
      schema: {
        question: fields.slug({ name: { label: 'Frage' } }),
        answer: fields.text({ label: 'Antwort', multiline: true }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Clubhaus', value: 'clubhaus' },
            { label: 'Tennishalle', value: 'tennishalle' },
            { label: 'Mitgliedschaft', value: 'mitgliedschaft' },
            { label: 'Außenplätze', value: 'aussenplaetze' },
            { label: 'Jugendtraining', value: 'jugendtraining' },
            { label: 'Mitgliederservice', value: 'mitgliederservice' },
          ],
          defaultValue: 'clubhaus',
        }),
        sortOrder: fields.integer({ label: 'Sortierung', defaultValue: 0 }),
      },
    }),
    downloads: collection({
      label: 'Downloads',
      slugField: 'title',
      path: 'src/content/downloads/*',
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        description: fields.text({ label: 'Beschreibung' }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Mitgliedschaft', value: 'mitgliedschaft' },
            { label: 'Sonstiges', value: 'sonstiges' },
          ],
          defaultValue: 'sonstiges',
        }),
        file: fields.file({ label: 'Datei', directory: 'public/downloads' }),
      },
    }),
  },
  singletons: {
    clubInfo: singleton({
      label: 'Vereinsinformationen',
      path: 'src/content/club-info',
      schema: {
        memberCount: fields.integer({ label: 'Mitgliederanzahl', defaultValue: 185 }),
        courtCount: fields.integer({ label: 'Plätze', defaultValue: 6 }),
        hallCount: fields.integer({ label: 'Hallen', defaultValue: 2 }),
        teamCount: fields.integer({ label: 'Mannschaften', defaultValue: 17 }),
      },
    }),
    hallPrices: singleton({
      label: 'Hallenpreise',
      path: 'src/content/hall-prices',
      schema: {
        seasonStart: fields.text({ label: 'Saisonbeginn', defaultValue: 'Erste Oktoberwoche' }),
        seasonEnd: fields.text({ label: 'Saisonende', defaultValue: 'Letzte Aprilwoche' }),
        pricesValidFrom: fields.text({ label: 'Preise gültig ab', defaultValue: '1. Oktober 2023' }),
        summerDiscount: fields.integer({ label: 'Sommerrabatt (%)', defaultValue: 50 }),
        youthDiscount: fields.integer({ label: 'Jugendrabatt (%)', defaultValue: 50 }),
      },
    }),
    membershipFees: singleton({
      label: 'Mitgliedsbeiträge',
      path: 'src/content/membership-fees',
      schema: {
        validFrom: fields.text({ label: 'Gültig ab', defaultValue: '1. Oktober 2023' }),
      },
    }),
  },
});
