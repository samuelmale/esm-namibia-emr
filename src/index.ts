import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import patientDashboardsConfig from "./namibia-esm-and-dashboards-config.json";

declare var __VERSION__: string;
const version = __VERSION__;

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
};

function setupOpenMRS() {
  const moduleName = "@ohri/esm-namibia-emr-app";

  const options = {
    featureName: "esm-namibia-emr-app",
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);
  provide(patientDashboardsConfig);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root"), options),
        route: "namibia-home",
      },
    ],
    extensions: [
      {
        id: "my-extension",
        slot: "namibia-home-dashboard",
        load: getAsyncLifecycle(() => import("./components/demo-extension"), {
          featureName: "extensions-demo",
          moduleName,
        }),
      },
      {
        id: "my-extension-2",
        slot: "namibia-home-dashboard",
        load: getAsyncLifecycle(() => import("./components/demo-extension"), {
          featureName: "extensions-demo-2",
          moduleName,
        }),
      },
      ,
      {
        id: "sam-jovan",
        slot: "patient-chart-summary-dashboard-slot",
        load: getAsyncLifecycle(() => import("./components/sam-jovan"), {
          featureName: "sam-jovan",
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, version };
