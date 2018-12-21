import {FileDocument, Pill, FilePlus, HumanHandsdown, Alert, TableSearch, HomeCircle} from "mdi-material-ui";

export const Routes = {
    LOGIN: {
        name: "Login",
        path: "/login/",
    },
    REGISTER: {
        name: "Register",
        path: "/register/",
    },
    ROOT: {
        name: "root",
        path: "/",
    },
    HOME: {
        name: "Patient Information",
        path: "/patientinformation",
        icon: HomeCircle,
        sidebar: true,
    },
    REPORTHISTORY: {
        name: "Report History",
        path: "/reporthistory",
        icon: FileDocument,
        sidebar: true,
    },
    MEDICATIONS: {
        name: "Medications",
        path: "/medications",
        icon: TableSearch,
        sidebar: true,
    },
    BUILDREPORT: {
        name: "Build Report",
        path: "/buildreport",
        icon: FilePlus,
        sidebar: true,
    },
    MEDREFERENCE: {
        name: "Medication Reference",
        path: "/reference/medication",
        icon: Pill,
        sidebar: true,
    },
    GENETICREFERENCE: {
        name: "Genetic Reference",
        path: "/reference/genetic",
        icon: HumanHandsdown,
        sidebar: true,
    },
    RISKFACTORS: {
        name: "Risk Factors",
        path: "/riskfactors",
        icon: Alert,
        sidebar: true,
    },
};