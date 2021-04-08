import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          oops_error: "Oops, there was an error :(",
          no_anomalies: "No anomalies found :)",
          main_description:
            "Upload an attendance list and see who joined (or left) before or after the majority of participants. These outliers are then showed in tables reporting the difference in minutes (format: <code>mm:ss</code>, example 03:22) from the average.",
          results_description: "Results depend on analysis type:",
          joined_description:
            "If <code>Joined</code> is chosen, then participants are anlyzed with respect to the average joining time. Those who joined before the average are marked with negative time value, while those joined late are marked with positive time value;",
          left_description:
            "If <code>Left</code> is chosen, then participants are anlyzed with respect to the average left time. Those who left before the average are marked with negative time value, while those left late are marked with positive time value;",
        },
      },
      it: {
        translations: {
          "Analyze MS Teams Attendance Lists":
            "Analizza le liste di partecipazione di MS Teams",
          "Attendance list(s)": "Liste di partecipazione",
          "Analysis type": "Tipo di analisi",
          Joined: "Entrata",
          Left: "Uscita",
          Results: "Analisi",
          oops_error: "Oops, si è verificato un errore :(",
          "Please select an attendance list":
            "Per favore carica una lista di partecipazione",
          no_anomalies: "Nessuna anomalia trovata :)",
          Name: "Nome",
          Anomaly: "Anomalia",
          "Loading...": "Caricamento...",
          "No data": "Nessun dato",
          "Select .csv files": "Scegli un file .csv",
          main_description:
            "Carica le liste di partecipazione e scopri chi entra (o esce) prima o dopo la maggioranza dei partecipanti. I valori anormali sono riportati in tabella mostrando la differenza in minuti (formato: <code>mm:ss</code>) rispetto alla media.",
          results_description:
            "I risultati dipendono dal tipo di analisi effettuata:",
          joined_description:
            "Se viene scelta <code>Entrata</code>, allora i partecipanti sono analizzati in relazione al tempo medio di entrata. Coloro entrati prima rispetto alla media sono marcati con un tempo negativo, mentre quelli entrati dopo sono marcati con un tempo positivo;",
          left_description:
            "Se viene scelta <code>Uscita</code>, allora i partecipanti sono analizzati in relazione al tempo medio di uscita. Coloro usciti prima rispetto alla media sono marcati con un tempo negativo, mentre quelli usciti dopo sono marcati con un tempo positivo;",
        },
      },
    },
    fallbackLng: "en",
    debug: false,
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ",",
    },
    // react: {
    //   wait: true,
    // },
  });
export default i18n;
